function generateTableOfContents() {
  const main = document.querySelector("main");
  const aside = document.querySelector("aside");
  const toc = document.createElement("nav");
  toc.classList.add("table-of-contents");

  const tocList = document.createElement("ul");
  toc.appendChild(tocList);

  const sections = main.querySelectorAll("section");

  sections.forEach((section, index) => {
    const h2 = section.querySelector("h2");
    if (h2) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = h2.textContent;
      a.href = `#section-${index + 1}`;
      li.appendChild(a);
      tocList.appendChild(li);

      // Add an id to the section for linking
      section.id = `section-${index + 1}`;

      const subList = document.createElement("ul");
      subList.style.display = "none"; // Initially hide sublist
      const h3s = section.querySelectorAll("h3");
      h3s.forEach((h3, subIndex) => {
        const subLi = document.createElement("li");
        const subA = document.createElement("a");
        subA.textContent = h3.textContent;
        subA.href = `#subsection-${index + 1}-${subIndex + 1}`;
        subLi.appendChild(subA);
        subList.appendChild(subLi);

        // Add an id to the h3 for linking
        h3.id = `subsection-${index + 1}-${subIndex + 1}`;
      });

      if (subList.children.length > 0) {
        li.appendChild(subList);

        // Add click event to toggle sublist visibility
        a.addEventListener("click", function (e) {
          e.preventDefault();
          subList.style.display =
            subList.style.display === "none" ? "block" : "none";
        });

        // Add an indicator for expandable items
        a.style.cursor = "pointer";
        a.textContent = "▶ " + a.textContent;
      }
    }
  });

  aside.appendChild(toc);
}

// Function to toggle the sublist and update the indicator
function toggleSublist(event) {
  event.preventDefault();
  const sublist = event.target.nextElementSibling;
  const isExpanded = sublist.style.display !== "none";
  sublist.style.display = isExpanded ? "none" : "block";
  event.target.textContent =
    (isExpanded ? "▶ " : "▼ ") + event.target.textContent.substring(2);
}

// Call the function when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", generateTableOfContents);
