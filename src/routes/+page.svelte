<script>
    import WordEditor from '../components/wordEditor.svelte'
    import Calender from '../components/Calander.svelte';
</script>

<!--
    단어 암기 프로그램
     - 외운 단어들을 json 형식으로 요일별로 저장함.
     - 원하는 요일들을 선택하여 해당 요일에 외웠던 단어들을 테스트함.
     - Front Page 는 Word Counter 으로.
-->


<div class="container">
    <WordEditor/>
    <!-- <Calender/> -->
</div>


<style>
    .container{
        margin-top: 100px;
    }
</style>