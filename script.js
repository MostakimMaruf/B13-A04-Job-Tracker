let interviewlist = [];
let rejectedlist = [];
let currentstatus = "All";

let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

const allJobsSections = document.getElementById("all-jobs");
const mainContainer = document.querySelector("main");
const filtersection = document.getElementById("filtered-section");

function calculateCount() {
    totalCount.innerText = allJobsSections.children.length
    interviewCount.innerText = interviewlist.length
    rejectedCount.innerText = rejectedlist.length
}

calculateCount()

function toggleStyle(id) {
    allFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
    interviewFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");
    rejectedFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

    allFilterBtn.classList.add("bg-gray-100", "text-black");
    interviewFilterBtn.classList.add("bg-gray-100", "text-black");
    rejectedFilterBtn.classList.add("bg-gray-100", "text-black");

    const selected = document.getElementById(id)
    currentstatus = id;

    selected.classList.remove("bg-gray-100", "text-black");
    selected.classList.add("bg-[#3B82F6]", "text-white");

    if (id == "interview-filter-btn") {
        allJobsSections.classList.add("hidden");
        filtersection.classList.remove("hidden");
    }
    else if (id == "all-filter-btn") {
        allJobsSections.classList.remove("hidden");
        filtersection.classList.add("hidden");
    }
    else if (id == "rejected-filter-btn") {
        allJobsSections.classList.add("hidden");
        filtersection.classList.remove("hidden");
        renderRejected()
    }

}

mainContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("interview-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const jobName = parentNode.querySelector(".job-name").innerText;
        const skills = parentNode.querySelector(".skills").innerText;
        const remote = parentNode.querySelector(".remote").innerText;
        const status = parentNode.querySelector(".status").innerText;
        const description = parentNode.querySelector(".description").innerText;

        parentNode.querySelector(".status").innerText = "Interview"

        const cardInfo = {
            jobName,
            skills,
            remote,
            status: "Interview",
            description
        }

        const jobExist = interviewlist.find(item => item.jobName == cardInfo.jobName)

        parentNode.querySelector(".status").innerText = "Interview"

        if (!jobExist) {
            interviewlist.push(cardInfo);
        }
        
        rejectedlist = rejectedlist.filter(item => item.jobName !== cardInfo.jobName) 
        if (currentstatus == "interview-filter-btn") {
            renderInterview()
        }
        calculateCount() 

    }
    else if (event.target.classList.contains("reject-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const jobName = parentNode.querySelector(".job-name").innerText;
        const skills = parentNode.querySelector(".skills").innerText;
        const remote = parentNode.querySelector(".remote").innerText;
        const status = parentNode.querySelector(".status").innerText;
        const description = parentNode.querySelector(".description").innerText;

        parentNode.querySelector(".status").innerText = "Rejected"

        const cardInfo = {
            jobName,
            skills,
            remote,
            status: "Rejected",
            description
        }

        const jobExist = rejectedlist.find(item => item.jobName == cardInfo.jobName)

        parentNode.querySelector(".status").innerText = "Rejected"

        if (!jobExist) {
            rejectedlist.push(cardInfo);
        }

        interviewlist = interviewlist.filter(item => item.jobName !== cardInfo.jobName)

        if (currentstatus == "interview-filter-btn") {
           renderInterview()
        }

        calculateCount()

    }

    // const cardInfo = {
    //     jobName,
    //     skills,
    //     remote,
    //     status: "Rejected",
    //     description
    // }

    // const jobExists = interviewlist.find(item => item.jobName == cardInfo.jobName)

    // parentNode.querySelector(".status").innerText = "Interview"

    // if (!jobExists) {
    //     interviewlist.push(cardInfo);
    // }

    //  interviewlist = interviewlist.filter(item => item.jobName !== cardInfo.jobName)
    // calculateCount()

    // renderInterview()


})


function renderInterview() {
    filtersection.innerHTML = ""
    for (let interview of interviewlist) {
        let div = document.createElement("div");
        div.className = 'card flex justify-between border p-6'
        div.innerHTML = ` 
        <div class="space-y-5">

                    <div>
                        <h2 class="job-name font-semibold text-[#002C5C] leading-8">${interview.jobName}</h2>
                        <p class="skills text-[#64748B]">${interview.skills}</p>
                    </div>
                    <div>
                        <p class="remote text-[14px] text-[#64748B]">${interview.remote}</p>
                    </div>
                    <p class="status font-medium text-[#002C5C] bg-[#EEF4FF] px-2 py-3 w-38 text-center rounded">${interview.status}
                        </p>
                    <p class="description text-[14px] text-[#64748B]">${interview.description}</p>
                    <div>
                        <button
                            class="interview-btn font-semibold text-green-500 border rounded-sm px-4 py-2">Interview</button>
                        <button
                            class="reject-btn font-semibold text-red-500 border rounded-sm px-4 py-2">Rejected</button>
                    </div>
                </div>

                <div>
                    <button class="delete-btn">delete</button>
                </div>
            </div>
        `

        filtersection.appendChild(div);
    }
}

function renderRejected() {
    filtersection.innerHTML = ""
    
    for (let rejected of rejectedlist) {
        let div = document.createElement("div");
        div.className = 'card flex justify-between border p-6'
        div.innerHTML = ` 
        <div class="space-y-5">

                    <div>
                        <h2 class="job-name font-semibold text-[#002C5C] leading-8">${rejected.jobName}</h2>
                        <p class="skills text-[#64748B]">${rejected.skills}</p>
                    </div>
                    <div>
                        <p class="remote text-[14px] text-[#64748B]">${rejected.remote}</p>
                    </div>
                    <p class="status font-medium text-[#002C5C] bg-[#EEF4FF] px-2 py-3 w-38 text-center rounded">${rejected.status}
                        </p>
                    <p class="description text-[14px] text-[#64748B]">${rejected.description}</p>
                    <div>
                        <button
                            class="interview-btn font-semibold text-green-500 border rounded-sm px-4 py-2">Interview</button>
                        <button
                            class="reject-btn font-semibold text-red-500 border rounded-sm px-4 py-2">Rejected</button>
                    </div>
                </div>

                <div>
                    <button class="delete-btn">delete</button>
                </div>
            </div>
        `

        filtersection.appendChild(div);
    }
}