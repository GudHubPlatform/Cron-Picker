import { Cron } from 'croner';

export const initCronPicker = (element) => {

    function createOptions(selectElement, start, end, settings) {
        for (let i = start; i <= end; i++) {
            const option = document.createElement("option");
            if (settings && settings.zeroPad && i < 10) {
                option.value = i;
                option.textContent = `0${i}`;
            } else {
                option.value = i;
                option.textContent = i;
            }
            selectElement.appendChild(option);
        }
    }
    
    function createCheckBoxes(containerElement, start, end, inputId, inputClass, settings) {
        for (let i = start; i <= end; i++) {
            const checkBoxDiv = document.createElement('div');
            checkBoxDiv.classList.add('checkBox');
    
            const label = document.createElement('label');
    
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = `${inputId}${i}`;
            input.classList.add('checkBox', inputClass);
            input.value = i;
            if (i === start) input.checked = true;
    
            const span = document.createElement('span');
            span.htmlFor = `${inputId}${i}`;
            if (settings && settings.zeroPad && i < 10) {
                span.textContent = `0${i}`;
            } else {
                span.textContent = i;
            }
    
            label.appendChild(input);
            label.appendChild(span);
            checkBoxDiv.appendChild(label);
            containerElement.appendChild(checkBoxDiv);
        }
    }
    
    function updateResult() {
        const seconds = cronPickerPopup.querySelector('#resultSeconds').textContent;
        const minutes = cronPickerPopup.querySelector('#resultMinutes').textContent;
        const hours = cronPickerPopup.querySelector('#resultHours').textContent;
        const dayOfMonth = cronPickerPopup.querySelector('#resultDayOfMonth').textContent;
        const month = cronPickerPopup.querySelector('#resultMonth').textContent;
        const dayOfWeek = cronPickerPopup.querySelector('#resultDayOfWeek').textContent;
        const result = `${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
        cronPickerPopup.querySelector('#generatedCron').value = result;

        const cron = new Cron(result);
        const nextRuns = cron.nextRuns(5);

        const runs = nextRuns.map((run) => {
            return `${run.toLocaleDateString('uk')} ${new Date(run).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false })}`;
        });

        cronPickerPopup.querySelector('.schedule').innerHTML = '';

        runs.forEach((run) => {
            const scheduleItem = document.createElement('div');
            scheduleItem.classList.add('schedule__item');
            scheduleItem.textContent = run;
            cronPickerPopup.querySelector('.schedule').appendChild(scheduleItem);
        });

    }
    
    function copyText(id) {
        var txt = document.getElementById(id);
        txt.select();
        document.execCommand("Copy");
        alert('COPIED');
    }
    
    function displayTab(tabArea) {
        tabArea.style.display = "block";
    }
    
    function hideTab(tabArea) {
        tabArea.style.display = "none";
    }
    
    function selectTab(selectedTab, unselectedTabs) {
        selectedTab.classList.remove("tab_unselected");
        for (let tab of unselectedTabs) {
            if(tab) {
                tab.classList.add("tab_unselected");
            }
        }
    }

    const cronPickerPopup = element.querySelector('.cron-picker__popup');

    // Seconds generation

    createOptions(document.getElementById("cronSecondOption2Value1"), 1, 60);
    createOptions(document.getElementById("cronSecondOption2Value2"), 0, 59);

    createOptions(document.getElementById("cronSecondOption4Value1"), 0, 59, { zeroPad: true });
    createOptions(document.getElementById("cronSecondOption4Value2"), 0, 59, { zeroPad: true });

    createCheckBoxes(cronPickerPopup.querySelector('#tabSecondArea .specificCheckbox'), 0, 59, 'cronSecondCheckBox', 'checkBoxCronSecondOption3', { zeroPad: true });

    // Minutes generation

    createOptions(document.getElementById("cronMinuteOption2Value1"), 1, 60);
    createOptions(document.getElementById("cronMinuteOption2Value2"), 0, 59, { zeroPad: true });

    createOptions(document.getElementById("cronMinuteOption4Value1"), 0, 59, { zeroPad: true });
    createOptions(document.getElementById("cronMinuteOption4Value2"), 0, 59, { zeroPad: true });

    createCheckBoxes(cronPickerPopup.querySelector('#tabMinuteArea .specificCheckbox'), 0, 59, 'cronMinuteCheckBox', 'checkBoxCronMinuteOption3', { zeroPad: true });

    // Hours generation

    createOptions(document.getElementById("cronHourOption2Value1"), 1, 24);
    createOptions(document.getElementById("cronHourOption2Value2"), 0, 23, { zeroPad: true });

    createOptions(document.getElementById("cronHourOption4Value1"), 0, 23, { zeroPad: true });
    createOptions(document.getElementById("cronHourOption4Value2"), 0, 23, { zeroPad: true });

    createCheckBoxes(cronPickerPopup.querySelector('#tabHourArea .specificCheckbox'), 0, 23, 'cronHourCheckBox', 'checkBoxCronHourOption3', { zeroPad: true });

    // Day of month generation

    createOptions(document.getElementById("cronDayOption3Value1"), 1, 31);

    createCheckBoxes(cronPickerPopup.querySelector('#tabDayArea .specificCheckbox.days'), 1, 31, 'cronDayCheckBox', 'checkBoxCronDayOption5', { zeroPad: true });

    // Logic

    document.getElementById('generatedCron').value = '0 0 0 ? JAN *';

    document.getElementById('btnCopy').addEventListener('click', function () {
        copyText('generatedCron');
    });

    document.getElementById("btnReset").addEventListener("click", () => {
        document.getElementById("generatedCron").value = "0 0 0 ? JAN *";

        document.getElementById("resultSeconds").textContent = "0";
        document.getElementById("resultMinutes").textContent = "0";
        document.getElementById("resultHours").textContent = "0";
        document.getElementById("resultDayOfMonth").textContent = "?";
        document.getElementById("resultMonth").textContent = "*";
        document.getElementById("resultDayOfWeek").textContent = "*";

        document.getElementById("cronSecondOption3").checked = true;
        document.getElementById("cronMinuteOption3").checked = true;
        document.getElementById("cronHourOption3").checked = true;
        document.getElementById("cronDayOption1").checked = true;
        document.getElementById("cronMonthOption3").checked = true;

        document.getElementById("tabMinutes").click();

        // init select option
        const selectElements = cronPickerPopup.querySelectorAll(".select");
        selectElements.forEach((element) => {
            element.selectedIndex = 0;
        });

        // init checkbox
        const checkBoxElements = cronPickerPopup.querySelectorAll(".checkBox");
        checkBoxElements.forEach((element) => {
            element.checked = false;
        });

        document.getElementById("cronSecondCheckBox0").checked = true;
        document.getElementById("cronMinuteCheckBox0").checked = true;
        document.getElementById("cronHourCheckBox0").checked = true;
        document.getElementById("cronDowSun").checked = true;
        document.getElementById("cronDayCheckBox1").checked = true;
        document.getElementById("cronMonth1").checked = true;
    });

    const tabSeconds = document.getElementById("tabSeconds");
    const tabMinutes = document.getElementById("tabMinutes");
    const tabHours = document.getElementById("tabHours");
    const tabDay = document.getElementById("tabDay");
    const tabMonth = document.getElementById("tabMonth");

    const tabSecondArea = document.getElementById("tabSecondArea");
    const tabMinuteArea = document.getElementById("tabMinuteArea");
    const tabHourArea = document.getElementById("tabHourArea");
    const tabDayArea = document.getElementById("tabDayArea");
    const tabMonthArea = document.getElementById("tabMonthArea");

    if(tabSeconds) {

        tabSeconds.addEventListener("click", function () {
            displayTab(tabSecondArea);
            hideTab(tabMinuteArea);
            hideTab(tabHourArea);
            hideTab(tabDayArea);
            hideTab(tabMonthArea);
            selectTab(tabSeconds, [tabMinutes, tabHours, tabDay, tabMonth]);
        });

    }

    tabMinutes.addEventListener("click", function () {
        if(tabSeconds) {
            hideTab(tabSecondArea);
        }
        displayTab(tabMinuteArea);
        hideTab(tabHourArea);
        hideTab(tabDayArea);
        hideTab(tabMonthArea);
        selectTab(tabMinutes, [tabSeconds ? tabSeconds : null, tabHours, tabDay, tabMonth]);
    });

    tabHours.addEventListener("click", function () {
        if(tabSeconds) {
            hideTab(tabSecondArea);
        }
        hideTab(tabMinuteArea);
        displayTab(tabHourArea);
        hideTab(tabDayArea);
        hideTab(tabMonthArea);
        selectTab(tabHours, [tabSeconds ? tabSeconds : null, tabMinutes, tabDay, tabMonth]);
    });

    tabDay.addEventListener("click", function () {
        if(tabSeconds) {
            hideTab(tabSecondArea);
        }
        hideTab(tabMinuteArea);
        hideTab(tabHourArea);
        displayTab(tabDayArea);
        hideTab(tabMonthArea);
        selectTab(tabDay, [tabSeconds ? tabSeconds : null, tabMinutes, tabHours, tabMonth]);
    });

    tabMonth.addEventListener("click", function () {
        if(tabSeconds) {
            hideTab(tabSecondArea);
        }
        hideTab(tabMinuteArea);
        hideTab(tabHourArea);
        hideTab(tabDayArea);
        displayTab(tabMonthArea);
        selectTab(tabMonth, [tabSeconds ? tabSeconds : null, tabMinutes, tabHours, tabDay]);
    });

    //second event
    cronPickerPopup.querySelector("#cronSecondOption1").addEventListener("click", () => {
        cronPickerPopup.querySelector("#resultSeconds").textContent = "*";
        updateResult();
    });

    cronPickerPopup.querySelector("#cronSecondOption2").addEventListener("click", () => {
        const valueEvery = cronPickerPopup.querySelector("#cronSecondOption2Value1").value;
        const valueStart = cronPickerPopup.querySelector("#cronSecondOption2Value2").value;
        cronPickerPopup.querySelector("#resultSeconds").textContent = `${valueStart}/${valueEvery}`;
        updateResult();
    });

    cronPickerPopup.querySelector("#cronSecondOption3").addEventListener("click", () => {
        const value = Array.from(cronPickerPopup.querySelectorAll("#tabSecondArea input[type='checkbox']"))
            .filter(el => el.checked)
            .map(el => el.value)
            .join(",");
        cronPickerPopup.querySelector("#resultSeconds").textContent = value.length === 0 ? "0" : value;
        updateResult();
    });

    cronPickerPopup.querySelector("#cronSecondOption4").addEventListener("click", () => {
        const valueFrom = cronPickerPopup.querySelector("#cronSecondOption4Value1").value;
        const valueTo = cronPickerPopup.querySelector("#cronSecondOption4Value2").value;
        cronPickerPopup.querySelector("#resultSeconds").textContent = `${valueFrom}-${valueTo}`;
        updateResult();
    });

    Array.from(cronPickerPopup.querySelectorAll(".selectCronSecondOption2")).forEach(el => {
        el.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronSecondOption2").click();
        });
    });

    Array.from(cronPickerPopup.querySelectorAll(".selectCronSecondOption4")).forEach(el => {
        el.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronSecondOption4").click();
        });
    });

    Array.from(cronPickerPopup.querySelectorAll(".checkBoxCronSecondOption3")).forEach(el => {
        el.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronSecondOption3").click();
        });
    });

    //minute event
    document.getElementById('cronMinuteOption1').addEventListener('click', () => {
        document.getElementById('resultMinutes').textContent = '*';
        updateResult();
    });

    document.getElementById('cronMinuteOption2').addEventListener('click', () => {
        const valueEvery = document.getElementById('cronMinuteOption2Value1').value;
        const valueStart = document.getElementById('cronMinuteOption2Value2').value;
        document.getElementById('resultMinutes').textContent = valueStart + '/' + valueEvery;
        updateResult();
    });

    document.getElementById('cronMinuteOption3').addEventListener('click', () => {
        const value = Array.from(cronPickerPopup.querySelectorAll('#tabMinuteArea input[type="checkbox"]'))
            .filter(input => input.checked)
            .map(input => input.value)
            .join(',');

        document.getElementById('resultMinutes').textContent = value.length ? value : '0';
        updateResult();
    });

    document.getElementById('cronMinuteOption4').addEventListener('click', () => {
        const valueFrom = document.getElementById('cronMinuteOption4Value1').value;
        const valueTo = document.getElementById('cronMinuteOption4Value2').value;
        document.getElementById('resultMinutes').textContent = valueFrom + '-' + valueTo;
        updateResult();
    });

    cronPickerPopup.querySelectorAll('.selectCronMinuteOption2').forEach(select => {
        select.addEventListener('change', () => {
            document.getElementById('cronMinuteOption2').click();
        });
    });

    cronPickerPopup.querySelectorAll('.selectCronMinuteOption4').forEach(select => {
        select.addEventListener('change', () => {
            document.getElementById('cronMinuteOption4').click();
        });
    });

    cronPickerPopup.querySelectorAll('.checkBoxCronMinuteOption3').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            document.getElementById('cronMinuteOption3').click();
        });
    });

    //hour event
    document.getElementById("cronHourOption1").addEventListener("click", () => {
        document.getElementById("resultHours").textContent = "*";
        updateResult();
    });

    document.getElementById("cronHourOption2").addEventListener("click", () => {
        const valueEvery = document.getElementById("cronHourOption2Value1").value;
        const valueStart = document.getElementById("cronHourOption2Value2").value;
        document.getElementById("resultHours").textContent = `${valueStart}/${valueEvery}`;
        updateResult();
    });

    document.getElementById("cronHourOption3").addEventListener("click", () => {
        const value = Array.from(cronPickerPopup.querySelectorAll("#tabHourArea input[type='checkbox']"))
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value)
            .join(",");
        document.getElementById("resultHours").textContent = value || "0";
        updateResult();
    });

    document.getElementById("cronHourOption4").addEventListener("click", () => {
        const valueFrom = document.getElementById("cronHourOption4Value1").value;
        const valueTo = document.getElementById("cronHourOption4Value2").value;
        document.getElementById("resultHours").textContent = `${valueFrom}-${valueTo}`;
        updateResult();
    });

    cronPickerPopup.querySelectorAll(".selectCronHourOption2").forEach((select) => {
        select.addEventListener("change", () => {
            document.getElementById("cronHourOption2").click();
        });
    });

    cronPickerPopup.querySelectorAll(".selectCronHourOption4").forEach((select) => {
        select.addEventListener("change", () => {
            document.getElementById("cronHourOption4").click();
        });
    });

    cronPickerPopup.querySelectorAll(".checkBoxCronHourOption3").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            document.getElementById("cronHourOption3").click();
        });
    });


    //month event
    cronPickerPopup.querySelector("#cronMonthOption1").addEventListener("click", () => {
        cronPickerPopup.querySelector('#resultMonth').textContent = '*';
        updateResult();
    });

    cronPickerPopup.querySelector("#cronMonthOption2").addEventListener("click", () => {
        const valueEvery = cronPickerPopup.querySelector('#cronMonthOption2Value1').value;
        const valueStart = cronPickerPopup.querySelector('#cronMonthOption2Value2').value;
        cronPickerPopup.querySelector('#resultMonth').textContent = valueStart + '/' + valueEvery;
        updateResult();
    });

    cronPickerPopup.querySelector("#cronMonthOption3").addEventListener("click", () => {
        const value = [...cronPickerPopup.querySelectorAll("#tabMonthArea input[type='checkbox']")]
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value)
            .join(',');
        const resultMonth = value.length === 0 ? '1' : value;
        cronPickerPopup.querySelector('#resultMonth').textContent = resultMonth;
        updateResult();
    });

    cronPickerPopup.querySelector("#cronMonthOption4").addEventListener("click", () => {
        const valueFrom = cronPickerPopup.querySelector('#cronMonthOption4Value1').value;
        const valueTo = cronPickerPopup.querySelector('#cronMonthOption4Value2').value;
        cronPickerPopup.querySelector('#resultMonth').textContent = valueFrom + '-' + valueTo;
        updateResult();
    });

    cronPickerPopup.querySelectorAll(".selectCronMonthOption2").forEach((element) => {
        element.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronMonthOption2").dispatchEvent(new Event('click'));
        });
    });

    cronPickerPopup.querySelectorAll(".selectCronMonthOption4").forEach((element) => {
        element.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronMonthOption4").dispatchEvent(new Event('click'));
        });
    });

    cronPickerPopup.querySelectorAll(".checkBoxCronMonthOption3").forEach((element) => {
        element.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronMonthOption3").dispatchEvent(new Event('click'));
        });
    });

    //day event
    document.getElementById("cronDayOption1").addEventListener("click", () => {
        document.getElementById("resultDayOfMonth").textContent = "?";
        document.getElementById("resultDayOfWeek").textContent = "*";
        updateResult();
    });

    document.getElementById("cronDayOption2").addEventListener("click", () => {
        const valueEvery = document.getElementById("cronDayOption2Value1").value;
        const valueStart = document.getElementById("cronDayOption2Value2").value;
        document.getElementById("resultDayOfWeek").textContent = `${valueStart}/${valueEvery}`;
        document.getElementById("resultDayOfMonth").textContent = "?";
        updateResult();
    });

    document.getElementById("cronDayOption3").addEventListener("click", () => {
        const valueEvery = document.getElementById("cronDayOption3Value1").value;
        const valueStart = document.getElementById("cronDayOption3Value2").value;
        document.getElementById("resultDayOfMonth").textContent = `${valueStart}/${valueEvery}`;
        document.getElementById("resultDayOfWeek").textContent = "?";
        updateResult();
    });

    document.getElementById("cronDayOption4").addEventListener("click", () => {
        const value = [];
        cronPickerPopup.querySelectorAll("#tabDayArea .checkBoxCronDayOption4").forEach((checkbox) => {
            if (checkbox.checked) {
                value.push(checkbox.value);
            }
        });
        const result = value.length === 0 ? "SUN" : value.join(",");
        document.getElementById("resultDayOfWeek").textContent = result;
        document.getElementById("resultDayOfMonth").textContent = "?";
        updateResult();
    });

    document.getElementById("cronDayOption5").addEventListener("click", () => {
        const value = [];
        cronPickerPopup.querySelectorAll("#tabDayArea .checkBoxCronDayOption5").forEach((checkbox) => {
            if (checkbox.checked) {
                value.push(checkbox.value);
            }
        });
        const result = value.length === 0 ? "1" : value.join(",");
        document.getElementById("resultDayOfMonth").textContent = result;
        document.getElementById("resultDayOfWeek").textContent = "?";
        updateResult();
    });

    document.getElementById("cronDayOption6").addEventListener("click", () => {
        document.getElementById("resultDayOfMonth").textContent = "L";
        document.getElementById("resultDayOfWeek").textContent = "?";
        updateResult();
    });

    document.getElementById("cronDayOption7").addEventListener("click", () => {
        document.getElementById("resultDayOfMonth").textContent = "LW";
        document.getElementById("resultDayOfWeek").textContent = "?";
        updateResult();
    });

    document.getElementById("cronDayOption8").addEventListener("click", () => {
        const value = document.getElementById("cronDayOption8Value").value;
        document.getElementById("resultDayOfWeek").textContent = `${value}L`;
        document.getElementById("resultDayOfMonth").textContent = "?";
        updateResult();
    });

    document.getElementById("cronDayOption9").addEventListener("click", () => {
        const value = document.getElementById("cronDayOption9Value").value;
        document.getElementById("resultDayOfMonth").textContent = `L-${value}`;
        document.getElementById("resultDayOfWeek").textContent = "?";
        updateResult();
    });

    document.getElementById("cronDayOption10").addEventListener("click", () => {
        const value = document.getElementById("cronDayOption10Value").value;
        document.getElementById("resultDayOfMonth").textContent = `${value}W`;
        document.getElementById("resultDayOfWeek").textContent = "?";
        updateResult();
    });

    cronPickerPopup.querySelector("#cronDayOption11").addEventListener("click", () => {
        const valueFrom = cronPickerPopup.querySelector("#cronDayOption11Value1").value;
        const valueTo = cronPickerPopup.querySelector("#cronDayOption11Value2").value;
        cronPickerPopup.querySelector("#resultDayOfWeek").textContent = `${valueTo}#${valueFrom}`;
        cronPickerPopup.querySelector("#resultDayOfMonth").textContent = "?";
        updateResult();
    });

    cronPickerPopup.querySelectorAll(".selectCronDayOption2").forEach((elem) => {
        elem.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronDayOption2").click();
        });
    });

    cronPickerPopup.querySelectorAll(".selectCronDayOption3").forEach((elem) => {
        elem.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronDayOption3").click();
        });
    });

    cronPickerPopup.querySelectorAll(".selectCronDayOption8").forEach((elem) => {
        elem.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronDayOption8").click();
        });
    });

    cronPickerPopup.querySelectorAll(".selectCronDayOption9").forEach((elem) => {
        elem.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronDayOption9").click();
        });
    });

    cronPickerPopup.querySelectorAll(".selectCronDayOption10").forEach((elem) => {
        elem.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronDayOption10").click();
        });
    });

    cronPickerPopup.querySelectorAll(".selectCronDayOption11").forEach((elem) => {
        elem.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronDayOption11").click();
        });
    });

    cronPickerPopup.querySelectorAll(".checkBoxCronDayOption4").forEach((elem) => {
        elem.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronDayOption4").click();
        });
    });

    cronPickerPopup.querySelectorAll(".checkBoxCronDayOption5").forEach((elem) => {
        elem.addEventListener("change", () => {
            cronPickerPopup.querySelector("#cronDayOption5").click();
        });
    });

    cronPickerPopup.querySelectorAll("#toolSnsArea .copy").forEach(element => {
        element.addEventListener("click", () => {
            copyClipboardText(element.getAttribute('alt'));
        });
    });

}