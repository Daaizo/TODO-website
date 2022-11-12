<a href='https://daaizo.github.io/TODO-website/'>Click to try the website </a>
<h2>Project features</h2>
<ul id="projectFeaturesList">
    <li>registration</li>
    <li>login</li>
    <li>todo and account management</li>
    <li>search box for todos</li>
    <li>page responsivity</li>
</ul>

<h2> Technology used</h2>
The entire site is done in HTML and CSS, there is no template used. For button actions im using JavaScript with JQuery.
For coding I used Visual Studio Code.
<h2> Project details</h2>
At first it was a project for HTML class. I decided to improve it and that's how the whole site was created. All
data is stored in local storage in JSON, the comments from the main page are taken from a separate server (a website that
provides sample json data). Slider mechanism is the only thing I didn't do myself, it is a slider from
https://kenwheeler.github.io/slick/ ( there were a lot of problems with it), the look was done by me. Everything is
saved as plain text so there is no security. User accounts are linked with todo on the basis of user login, which must
be unique. The login is handled by GET, and the page entered without parameters is treated as a guest page on which they
can try the functionality of adding and managing todo, then they are assigned to the user tempUser. Some things like
alerts or hamburger menu are based on examples from https://www.w3schools.com, but have been reworked for the project.
The project was created 100% by me.
