let interviewlist = [];
let rejectedlist = [];
let currentstatus = "all-filter-btn";

let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");
let jobSummary = document.getElementById("jobSummary");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allJobsSections = document.getElementById("all-jobs");
const mainContainer = document.querySelector("main");
const filtersection = document.getElementById("filtered-section");


// count function

function calculateCount() {

    const totalJobs = document.querySelectorAll("#all-jobs .card").length;

    totalCount.innerText = totalJobs;
    interviewCount.innerText = interviewlist.length;
    rejectedCount.innerText = rejectedlist.length;

    if (currentstatus === "all-filter-btn") {
        jobSummary.innerText = `${totalJobs} jobs`;
    }

    if (currentstatus === "interview-filter-btn") {
        jobSummary.innerText = `${interviewlist.length} of ${totalJobs} jobs`;
    }

    if (currentstatus === "rejected-filter-btn") {
        jobSummary.innerText = `${rejectedlist.length} of ${totalJobs} jobs`;
    }
}

calculateCount();


// main card status update 

function updateMainCardStatus(jobName, newStatus) {

    const allCards = document.querySelectorAll("#all-jobs .card");

    allCards.forEach(card => {
        const name = card.querySelector(".job-name").innerText;

        if (name === jobName) {
            card.querySelector(".status").innerText = newStatus;
        }
    });
}


// filter button style 

function toggleStyle(id) {

    currentstatus = id;

    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.remove("bg-[#3B82F6]", "text-white");
        btn.classList.add("bg-gray-100", "text-black");
    });

    const selected = document.getElementById(id);
    selected.classList.remove("bg-gray-100", "text-black");
    selected.classList.add("bg-[#3B82F6]", "text-white");

    if (id === "all-filter-btn") {
        allJobsSections.classList.remove("hidden");
        filtersection.classList.add("hidden");
    }

    if (id === "interview-filter-btn") {
        allJobsSections.classList.add("hidden");
        filtersection.classList.remove("hidden");
        renderInterview();
    }

    if (id === "rejected-filter-btn") {
        allJobsSections.classList.add("hidden");
        filtersection.classList.remove("hidden");
        renderRejected();
    }

    calculateCount();
}


// main event section

mainContainer.addEventListener("click", function (event) {

    const parentNode = event.target.closest(".card");
    if (!parentNode) return;

    const jobName = parentNode.querySelector(".job-name").innerText;
    const skills = parentNode.querySelector(".skills").innerText;
    const remote = parentNode.querySelector(".remote").innerText;
    const description = parentNode.querySelector(".description").innerText;


    // interview section

    if (event.target.classList.contains("interview-btn")) {

        const alreadyInterview = interviewlist.find(item => item.jobName === jobName);
        if (alreadyInterview) return;

        const cardInfo = {
            jobName,
            skills,
            remote,
            status: "Interview",
            description
        };

        interviewlist.push(cardInfo);
        rejectedlist = rejectedlist.filter(item => item.jobName !== jobName);

        updateMainCardStatus(jobName, "Interview");

        calculateCount();

        if (currentstatus === "interview-filter-btn") renderInterview();
        if (currentstatus === "rejected-filter-btn") renderRejected();
    }


    // reject section

    if (event.target.classList.contains("reject-btn")) {

        const alreadyRejected = rejectedlist.find(item => item.jobName === jobName);
        if (alreadyRejected) return;

        const cardInfo = {
            jobName,
            skills,
            remote,
            status: "Rejected",
            description
        };

        rejectedlist.push(cardInfo);
        interviewlist = interviewlist.filter(item => item.jobName !== jobName);

        updateMainCardStatus(jobName, "Rejected");

        calculateCount();

        if (currentstatus === "interview-filter-btn") renderInterview();
        if (currentstatus === "rejected-filter-btn") renderRejected();
    }


    // delete section

    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
        interviewlist = interviewlist.filter(item => item.jobName !== jobName);
        rejectedlist = rejectedlist.filter(item => item.jobName !== jobName);

        const card = deleteBtn.closest(".card");
        if (card) card.remove();

        calculateCount();

        if (currentstatus === "interview-filter-btn") renderInterview();
        if (currentstatus === "rejected-filter-btn") renderRejected();
    }

});


// interview render section

function renderInterview() {

    filtersection.innerHTML = "";

    if (interviewlist.length === 0) {
        filtersection.innerHTML = `
            <div class="text-center py-10 border border-dashed border-gray-400 rounded">
                <img src="./images/jobs.png" alt="No Jobs" class="mx-auto mb-4 w-16 opacity-50">
                <p class="text-xl font-semibold text-gray-700">No Jobs Available</p>
                <p class="text-gray-500">You haven't selected any jobs for interview yet.</p>
            </div>
        `;
        return;
    }

    interviewlist.forEach(interview => {

        let div = document.createElement("div");
        div.className = "card flex justify-between border rounded border-gray-400 p-6";

        div.innerHTML = `
            <div class="space-y-5">
                <div>
                    <h2 class="job-name font-semibold text-[#002C5C] leading-8">${interview.jobName}</h2>
                    <p class="skills text-[#64748B]">${interview.skills}</p>
                </div>
                <div>
                    <p class="remote text-[14px] text-[#64748B]">${interview.remote}</p>
                </div>
                <p class="status font-medium text-[#002C5C] bg-[#EEF4FF] px-2 py-3 w-[150px] text-center rounded">
                    Interview
                </p>
                <p class="description text-[14px] text-[#64748B]">${interview.description}</p>
                <div>
                    <button class="interview-btn font-semibold text-green-500 border rounded-sm px-4 py-2">Interview</button>
                    <button class="reject-btn font-semibold text-red-500 border rounded-sm px-4 py-2">Rejected</button>
                </div>
            </div>
           <div>
                    <button class="delete-btn cursor-pointer bg-gray-200 w-10 h-10 rounded-[50%] p-1.5">
                       <i class="fa-regular fa-trash-can text-red-400"></i>
                    </button>
                </div>
        `;

        filtersection.appendChild(div);
    });
}


// rejected render section

function renderRejected() {

    filtersection.innerHTML = "";

    if (rejectedlist.length === 0) {
        filtersection.innerHTML = `
            <div class="text-center border border-dashed border-gray-400 rounded py-10">
                <img src="./images/jobs.png" alt="No Jobs" class="mx-auto mb-4 w-16 opacity-50">
                <p class="text-xl font-semibold text-gray-700">No Jobs Available</p>
                <p class="text-gray-500">You haven't rejected any jobs yet.</p>
            </div>
        `;
        return;
    }

    rejectedlist.forEach(rejected => {

        let div = document.createElement("div");
        div.className = "card flex justify-between border rounded border-gray-400 p-6";

        div.innerHTML = `
            <div class="space-y-5 ">
                <div>
                    <h2 class="job-name font-semibold text-[#002C5C] leading-8">${rejected.jobName}</h2>
                    <p class="skills text-[#64748B]">${rejected.skills}</p>
                </div>
                <div>
                    <p class="remote text-[14px] text-[#64748B]">${rejected.remote}</p>
                </div>
                <p class="status font-medium text-[#002C5C] bg-[#EEF4FF] px-2 py-3 w-[150px] text-center rounded">
                    Rejected
                </p>
                <p class="description text-[14px] text-[#64748B]">${rejected.description}</p>
                <div>
                    <button class="interview-btn font-semibold text-green-500 border rounded-sm px-4 py-2">Interview</button>
                    <button class="reject-btn font-semibold text-red-500 border rounded-sm px-4 py-2">Rejected</button>
                </div>
            </div>
        <div>
                    <button class="delete-btn cursor-pointer bg-gray-200 w-10 h-10 rounded-[50%] p-1.5">
                       <i class="fa-regular fa-trash-can text-red-400"></i>
                    </button>
          </div>
        `;

        filtersection.appendChild(div);
    });
}