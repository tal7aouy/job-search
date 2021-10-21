// event linsteners
const searchFiled = document.getElementById('filter_jobs')
document.querySelector('.button-box').addEventListener('click', () => {
  fetchJobs().then((jobs) => {
    let filteredJobs = filterJobs(jobs, searchFiled.value)
    showJobs(filteredJobs)
  })
})

function fetchJobs() {
  return fetch('data.json')
    .then((response) => response.json())
    .then((data) => {
      return data
    })
}

function filterJobs(jobs, searchText) {
  if (searchText) {
    let filteredJobs = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText.toLowerCase()) ||
        job.type.toLowerCase().includes(searchText.toLowerCase()) ||
        job.company.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true
      } else {
        return false
      }
    })
    return filteredJobs
  } else {
    return jobs
  }
}

function showJobs(jobs) {
  let jobsBox = document.querySelector('.jobs-box')
  let jobsCount = (document.getElementById('countJobs').textContent =
    jobs.length)
  let htmlJobs = ''
  jobs.forEach((job) => {
    htmlJobs += `  <div class="job-card">
          <div class="job-header">
            <img src="${job.logo}" alt="" />
            <span class="material-icons more_horiz">more_horiz</span>
          </div>
          <div class="title">
            <span>${job.roleName}</span>
          </div>
          <div class="description">
            <span
              >${job.requirements.intro}</span
            >
          </div>
          
          <div class="buttons">
            <div class="button apply-now">Apply Now</div>
            <div class="button">Message</div>
          </div>
        </div>`
  })
  jobsBox.innerHTML = htmlJobs
}
fetchJobs().then((data) => {
  showJobs(data)
})
