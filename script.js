let totalCount = document.getElementById("totalCount");
let interviewCount = document.getElementById("interviewCount");
let rejectedCount = document.getElementById("rejectedCount");

const allJobsSections = document.getElementById("all-jobs");

function updateCounts() {
    totalCount.innerText = allJobsSections.children.length;
}


