<script>
import '../styles/wordEditor.scss'
import "../js/translator_api.js"
import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Checkbox, TableSearch } from 'flowbite-svelte';
import { Input, Label, Helper, Button } from 'flowbite-svelte';
import { translate } from '../js/translator_api.js'

let word = ''
let idx = 0;

let meanList = [
{id : 0, word : "test1", isEditable : false},
{id : 1, word : "test2", isEditable : false},
{id : 2, word : "test3", isEditable : false},
{id : 3, word : "test4", isEditable : false},
]

async function input_handleKeydown(e){
    if(e.key == "Enter"){
        try {
            const result = await translate(word);
            meanList = [...meanList, {id : ++idx, word : result, isEditable : false}];
            console.log(meanList);
        } catch (error) {
            console.log("err");
        }
    }
}


function button_handleKeydown(index){
  meanList = meanList.filter(obj => obj.id !== index);
	console.log(meanList);
}

function Add_new_item(){
	meanList = [...meanList, {id : ++idx, word : "", isEditable : true}];
}

</script>


<div class="word-editor__contain">
	<!-- 
		우측에서 word form 을 작성하고 add 버튼을 눌러서 리스트에 추가
		test, test history, in/completed words
	 -->

	 <section class="title-bar">
        <button class="title-bar__burger">
            <span class="burger__lines"></span>
        </button>
    </section>

	<section class="word-editor__body">
		
	</section>

    <aside class="word-editor__sidebar">
		<form>
		<div class="word_input__body p-2 ml-4 mt-4 max-w-[200px] overflow-hidden box-border">
			<Label for="first_name" class="mb-2">Word</Label>
			<Input on:keypress={input_handleKeydown} type="text" placeholder="ex) apple / 사과" required size="sm" bind:value={word}/>
			<div class="mt-2 relative overflow-hidden">
				<table class="w-full text-left text-sm text-gray-500 dark:text-gray-400" cellpadding="5">
					<tbody>
					{#if meanList.length != 0}
						{#each meanList as obj}
							<tr class="box-border border-b last:border-b-0 bg-white dark:bg-gray-800 dark:border-gray-700">
							{#if obj.isEditable}
							<td style="display:flex; justify-content: space-between;">
								<input type="text" class=" whitespace-nowrap font-medium text-gray-900 dark:text-white h-[10px] w-full"/>
								<button on:click={() => button_handleKeydown(obj.id)} type="button" class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-1 text-xs text-white bg-gray-600 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 rounded-lg">X</button>
							</td>
							{:else}
							<td style="display:flex; justify-content: space-between;" class="px-6 whitespace-nowrap font-medium text-gray-900 dark:text-white">{obj.word}
								<button on:click={() => button_handleKeydown(obj.id)} type="button" class="text-center font-medium focus:ring-4 focus:outline-none inline-flex items-center justify-center px-1 text-xs text-white bg-gray-600 hover:bg-gray-900 focus:ring-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 rounded-lg">X</button>
							</td>
							{/if}
							</tr>
						{/each}
					{/if}
					</tbody>
				</table>
				{#if meanList.length != 0}
					<div on:click={() => {Add_new_item()}} class="mt-2 text-center">
						<div class="round-button">+</div>
					</div>
				{/if}
			</div>
		</div>
		

		<!-- <Button type="submit" on:click={() => {translate(word)}} >Submit</Button> -->
		</form>
    </aside>
</div>

<style>
  .round-button {
    display: inline-block;
    border-radius: 50%;
    background-color: gray;
    color: white;
    padding: 2px 7px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
  }

</style>


<!-- 
#583696
#744d4d
 -->