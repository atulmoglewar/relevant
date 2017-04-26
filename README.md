# relevant.js
### What is relevant.js?

A lot of time the target readers of article fall into different categories. For ex, consider you are writing article about configuring a software. Your target reader's categories in this case will be Windows, Mac and Linux users. For configuring software, most of the steps are common but then there are some steps specific to platform. Common practice followed in writing such an article is to write common steps and then adding paragraphs mentioning platform specific steps. Though this works, this approach adds unnecessary clutter in the article. If reader is a linux user he will have to skim through the article to decide what are relevant steps for him and what steps should he ignore. Wouldn’t it be nice if the reader sees only the content relevant to him? 

relevant.js is a small javascript library for showing the content relevant to the user. The author of the article will have to define the relevant keys and mark the relevancy in the HTML using **"data-relevant-key"** attribute. For example, if the article is about configuring software on different paltforms then the keys can be "windows", "mac" and "linux". The example below shows how to use it.
```sh
<div>This is common content</div>
<div data-relevant-key="windows">This is windows specific content</div>
<div data-relevant-key="mac">This is mac specific content</div>
<div data-relevant-key="linux">This is linux specific content</div>
<div>This is also common content</div>
```
The result of calling relevant.showSpecific("windows"); on above markup will be
```sh
This is common content
This is windows specific content
This is also common content
```
If the article is about tax saving tips. Then the reader's category could be "salaried", "self-employeed" etc, and markup can look as shown below
```sh
<div>This is common tip</div>
<div data-relevant-key="salaried">This tip is for salaried employee</div>
<div data-relevant-key="self-employeed">This tip is for self-employeed</div>
<div>This is also common tip</div>
```
Deciding on UI/UX for showing the relevant content will be author's responsibility. For the example above, software configuration example above, author can choose to identify the OS when the page is loaded and call the showSpecific function with correct value. 

The library exposes just 2 public apis.
- showAll() - Shows all the content
- showSpecific(key) - Hides the content of the relevant elements whose **data-relevant-key** attribute value doesn't match the argument. 

The library makes sure to restore the correct css display type of the element as shown in the example.html in the repository.