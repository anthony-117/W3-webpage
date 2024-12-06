function createReferenceSection(references) {
  const section = document.createElement("section");

  const heading = document.createElement("h2");
  heading.textContent = "References";
  section.appendChild(heading);

  const ol = document.createElement("ol");
  ol.className = "reference-list";

  references.forEach((ref) => {
    const li = document.createElement("li");

    const source = document.createTextNode(`${ref.source}. (n.d.). `);
    li.appendChild(source);
    const italic = document.createElement("i");
    italic.textContent = ref.title;
    li.appendChild(italic);
    li.appendChild(document.createTextNode(" "));

    const link = document.createElement("a");
    link.href = ref.url;
    link.target = "_blank";
    link.textContent = ref.url;
    li.appendChild(link);

    ol.appendChild(li);
  });

  section.appendChild(ol);

  return section;
}
document.addEventListener("DOMContentLoaded", ()=>{
  const referenceSection = createReferenceSection(references);
 document.querySelector("main").appendChild(referenceSection);
})