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

const references = [
  {
    source: "PCMag",
    title: "30 Years of Browsers: A Quick History",
    url: "https://www.pcmag.com/news/30-years-of-browsers-a-quick-history",
  },
  {
    source: "Mozilla",
    title: "Firefox: Browser History",
    url: "https://www.mozilla.org/en-US/firefox/browsers/browser-history/",
  },
  {
    source: "Google Developers",
    title: "How Search Works",
    url: "https://developers.google.com/search/docs/fundamentals/how-search-works",
  },
  {
    source: "GeeksforGeeks",
    title: "Page Rank Algorithm Implementation",
    url: "https://www.geeksforgeeks.org/page-rank-algorithm-implementation/",
  },
  {
    source: "Medium",
    title: "History of HTML: From Evolution to Popularity",
    url: "https://seattlewebsitedesign.medium.com/history-of-html-from-evolution-to-popularity-ccc7286d0ab",
  },
  {
    source: "W3C",
    title: "Chapter 2: History of the Web",
    url: "https://www.w3.org/People/Raggett/book4/ch02.html",
  },
  {
    source: "W3C",
    title: "HTML Event Attributes",
    url: "https://www.w3schools.com/tags/ref_eventattributes.asp",
  },
  {
    source: "PHP",
    title: "PHP: PHP type comparison tables - Manual ",
    url: "https://www.php.net/manual/en/types.comparisons.php",
  },
  {
    source: "PHP",
    title: "PHP: New features - Manual ",
    url: "https://www.php.net/manual/en/migration70.new-features.php",
  },
  {
    source: "PHP",
    title: "PHP: Static Keyword - Manual",
    url: "https://www.php.net/manual/en/language.oop5.static.php",
  },
  {
    source: "W3schools",
    title: "HTML Input Tag",
    url: "https://www.w3schools.com/tags/tag_input.asp",
  },
  {
    source: "W3schools",
    title: "HTML Button Tag",
    url: "https://www.w3schools.com/tags/tag_button.asp",
  },
];

const referenceSection = createReferenceSection(references);
document.querySelector("main").appendChild(referenceSection);
