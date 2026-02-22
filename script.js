let interviewlist = [];
let rejectedlist = [];


let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");


const allJobsSections = document.getElementById("all-jobs");
const mainContainer = document.querySelector("main");


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

    // console.log(id);
    
    const selected = document.getElementById(id)
    // console.log(selected); 

    selected.classList.remove("bg-gray-100", "text-black");
    selected.classList.add("bg-[#3B82F6]", "text-white");
    
}
