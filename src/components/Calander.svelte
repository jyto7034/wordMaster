<script>
import '../styles/calender.scss'
import { task_data, errTask_data } from '../js/test_data';
import { day_name, day_fullname, month_name } from '../js/calender_data.js';

let Total_word = 0;
let Current_streak = 0;
let Longest_streak = 0;

let date = new Date();
let year = date.getFullYear();
let Month = date.getMonth() + 1;

function Get_days_in_month(month) {
    return new Date(year, month, 0).getDate();
}

function Get_first_day_of_month(month) {
    return new Date(year, month, 1).getDay();
}

let days = [];

function Set_days() {
    for (let i = Get_days_in_month(Month - 1) - Get_first_day_of_month(Month - 1) + 1; i <= Get_days_in_month(Month - 1); i++) {
        days.push({
            day: i,
            month: Month - 1,
            isCurrentMonth: false
        });
    }

    for (let i = 1; i <= Get_days_in_month(Month); i++) {
        days.push({
            day: i,
            month: Month,
            isCurrentMonth: true
        });
    }

    for (let i = 1; i < 42 - Get_days_in_month(Month) - Get_first_day_of_month(Month - 1) + 1; i++) {
        days.push({
            day: i,
            month: Month + 1,
            isCurrentMonth: false
        });
    }
    while (days.length <= 49) {
        days.push({
            day: -1,
            month: -1,
            isCurrentMonth: false,
        });
    }
}

Set_days();

function Change_month(val) {
    if(!val){
        if(Month - 1 == 0){
            year -= 1;            
            Month = 12;
        }else
        Month--;
    }
    else{
        if(Month + 1 == 13){
            year += 1;            
            Month = 1;
        }else
        Month++;
    }
            
    days = [];
    Set_days();
}

function Get_task(month, date) {
    let v = task_data.filter(obj => {
        return obj.Get_Month == month && obj.Get_day == date -2 && obj.Get_Year == year
    });
    return v.length == 0 ? errTask_data[0] : v[0];
}

</script>

<main class="calendar-contain">
    <section class="title-bar">
        <button class="title-bar__burger">
            <span class="burger__lines">Toggle Menu</span>
        </button>
        <span class="title-bar__year">
            Calendar > {month_name[Month]}
        </span>
        <span class="title-bar__month--month">
            Month
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="title-bar__month--month--move-left--body">
                <div class="title-bar__month--month--move-left" on:click={() => Change_month(0)}>
                    &lt;
                </div>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="title-bar__month--month--move-right--body">
                <div class="title-bar__month--month--move-right" on:click={() => Change_month(1)}>
                    &gt;
                </div>
            </div>
        </span>
    </section>

    <aside class="calendar__sidebar">
        <div class="sidebar__nav">
        </div>
        <h2 class="sidebar__heading">{day_fullname[(date.getDate() + 1 )% 7]}<br>{month_name[Month]} {Month}</h2>
        <div class="sidebar__divide">
        </div>
        <ul class="sidebar__list">
            <div>Total word {Total_word}</div>
            <div>Current Streak {Current_streak}</div>
            <div>Longest Streak {Longest_streak}</div>
            
            <!-- Todo List -->
            <!-- <li class="sidebar__list-item sidebar__list-item--complete"><span class="list-item__time">8.30</span> Team Meeting</li>
            <li class="sidebar__list-item sidebar__list-item--complete"><span class="list-item__time">10.00</span> Lunch with Sasha</li>
            <li class="sidebar__list-item"><span class="list-item__time">2.30</span> Design Review</li>
            <li class="sidebar__list-item"><span class="list-item__time">4.00</span> Get Groceries</li> -->
        </ul>
    </aside>

    <section class="calendar__days">

        <section class="calendar__top-bar">
            {#each day_name as day}
            <span class="top-bar__days">{day}</span>
            {/each}
        </section>

        {#each Array(6) as _, i}
        <section class="calendar__week">
            {#each Array(7) as _, j}
            {#if days[i * 7 + j].isCurrentMonth}
            <div class="calendar__day">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span class="calendar__date">{days[i * 7 + j].day}</span>

                {#if Get_task(Month, i * 7 + j).date.split("-")[0] != "0000"}
                    {#if Get_task(Month, i * 7 + j).Entire_word_Count != 0}
                        <span class="calendar__task"></span>
                        
                    {:else}
                    <div class="calendar__task--body">
                        <span class="calendar__task--item">
                            {Get_task(Month, i * 7 + j).Entire_word_Count}
                        </span>
                        <span class="calendar__task--item" style="color : Red">
                            {Get_task(Month, i * 7 + j).To_be_tested_word_Count}
                        </span>
                        <span class="calendar__task--item" style="color : blue">
                            {Get_task(Month, i * 7 + j).Complete_word_Count}
                        </span>
                    </div>
                    {/if}
                {/if}
            </div>

            {:else}
            <div class="calendar__day inactive">
                <span class="calendar__date">{days[i * 7 + j].day}</span>
            </div>
            {/if}
            {/each}
        </section>
        {/each}
    </section>
</main>
