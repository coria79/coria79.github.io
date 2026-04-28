const COURSES_PER_PAGE = 10;

let courses = [];
let filteredCourses = [];
let currentPage = 1;

const coursesContainer = document.getElementById("courses-container");
const coursesPagination = document.getElementById("courses-pagination");

const filterOrganization = document.getElementById("filter-organization");
const filterSkill = document.getElementById("filter-skill");
const filterYear = document.getElementById("filter-year");

async function loadCourses() {
  try {
    const response = await fetch("assets/data/courses.json");

    if (!response.ok) {
      throw new Error("Could not load courses.json");
    }

    courses = await response.json();
    filteredCourses = [...courses];

    populateFilters();
    addFilterEvents();
    renderCourses();
    renderPagination();
  } catch (error) {
    coursesContainer.innerHTML = `
      <section class="block">
        <div class="card-main">
          <p class="item-p">Courses could not be loaded.</p>
        </div>
      </section>
    `;

    console.error(error);
  }
}

function populateFilters() {
  const organizations = [...new Set(courses.map(course => course.organization).filter(Boolean))].sort();

  const skills = [...new Set(
    courses
      .flatMap(course => course.skill.split(",").map(skill => skill.trim()))
      .filter(Boolean)
  )].sort();

  const years = [...new Set(
    courses
      .map(course => course.date ? course.date.substring(0, 4) : "")
      .filter(Boolean)
  )].sort((a, b) => b - a);

  organizations.forEach(organization => {
    const option = document.createElement("option");
    option.value = organization;
    option.textContent = organization;
    filterOrganization.appendChild(option);
  });

  skills.forEach(skill => {
    const option = document.createElement("option");
    option.value = skill;
    option.textContent = skill;
    filterSkill.appendChild(option);
  });

  years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    filterYear.appendChild(option);
  });
}

function addFilterEvents() {
  filterOrganization.addEventListener("change", applyFilters);
  filterSkill.addEventListener("change", applyFilters);
  filterYear.addEventListener("change", applyFilters);
}

function applyFilters() {
  const selectedOrganization = filterOrganization.value;
  const selectedSkill = filterSkill.value;
  const selectedYear = filterYear.value;

  filteredCourses = courses.filter(course => {
    const matchesOrganization =
      selectedOrganization === "" || course.organization === selectedOrganization;

    const courseSkills = course.skill
      .split(",")
      .map(skill => skill.trim());

    const matchesSkill =
      selectedSkill === "" || courseSkills.includes(selectedSkill);

    const courseYear = course.date ? course.date.substring(0, 4) : "";

    const matchesYear =
      selectedYear === "" || courseYear === selectedYear;

    return matchesOrganization && matchesSkill && matchesYear;
  });

  currentPage = 1;
  renderCourses();
  renderPagination();
}

function renderCourses() {
  const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
  const endIndex = startIndex + COURSES_PER_PAGE;
  const visibleCourses = filteredCourses.slice(startIndex, endIndex);

  if (visibleCourses.length === 0) {
    coursesContainer.innerHTML = `
      <section class="block">
        <div class="card-main">
          <p class="item-p">No courses found with the selected filters.</p>
        </div>
      </section>
    `;
    return;
  }

  coursesContainer.innerHTML = visibleCourses.map(course => {
    return `
      <section class="block">
        <div class="card-main">
          <div class="card-top">
            <article class="item item-course">

              <div class="item-course__body">
                <h4 class="item-h">#${String(course.number).padStart(3, "0")} - ${course.title}</h4>
                <div class="item-meta">Issuing organization: ${course.organization}</div>
                <p class="item-p">
                  Date: ${course.date}
                  <br>
                  ${course.instructor ? `Instructor: ${course.instructor}<br>` : ""}
                  Duration: ${course.duration}
                  <br>
                  Skill: ${course.skill}
                </p>
              </div>

              <div class="item-course__thumb">
                <img src="${course.thumbnail}" alt="Certificate thumbnail - ${course.title}">
              </div>

            </article>
          </div>
        </div>
      </section>
    `;
  }).join("");
}

function renderPagination() {
  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);

  coursesPagination.innerHTML = "";

  if (totalPages <= 1) {
    return;
  }

  for (let page = 1; page <= totalPages; page++) {
    const button = document.createElement("button");

    button.textContent = page;
    button.classList.add("page-btn");

    if (page === currentPage) {
      button.classList.add("is-active");
    }

    button.addEventListener("click", () => {
      currentPage = page;
      renderCourses();
      renderPagination();
    });

    coursesPagination.appendChild(button);
  }
}

loadCourses();