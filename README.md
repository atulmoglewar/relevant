# What is Relevant?

A lot of time the target readers of article fall into different categories. For ex, consider you are writing article about configuring a software. Your target reader's categories in this case will be Windows, Mac and Linux users. For configuring software, most of the steps are common but then there are some steps specific to platform. Common practice followed in writing such an article is to write common steps and then adding paragraphs mentioning platform specific steps. Though this works, this approach adds unnecessary clutter in the article. If reader is a linux user he will have to skim through the article to decide what are relevant steps for him and what steps should he ignore. Wouldn’t it be nice if the reader sees only the content relevant to him? 

Relevant is a micro javascript library for showing the relevant content to the user. The author of the article will have to define the relevant keys and mark the relevancy in the HTML using **"data-relevant-key"** attribute. For example, if the article is about configuring software on different paltforms then the keys can be "windows", "mac" and "linux". The example below shows how to use it. 
```sh
<div>This is common content</div>
<div data-relevant-key="windows">This is windows specific content</div>
<div data-relevant-key="mac">This is mac specific content</div>
<div data-relevant-key="linux">This is linux specific content</div>
<div>This is also common content</div>
```
The result of calling relevant.showSpecificFromGroup("windows"); on above markup will be
```sh
This is common content
This is windows specific content
This is also common content
```
If the article is about tax saving tips. Then the reader's category could be "salaried", "self-employeed" etc, and markup can look as shown below
```sh
<div>This is a common tip</div>
<div data-relevant-key="salaried">This tip is for salaried employees</div>
<div data-relevant-key="self-employeed">This tip is for self-employeed</div>
<div>This is also a common tip</div>
```
Relevant also supports groups using the optional attribute **"data-relevant-key-group"**. Grouping enables author to show relevant information from multiple groups at the same time. If group is not mentioned, the element becomes part of special group called **"data-relevant-key-group-none"**.
For example, if the article is about desktop and mobile OS and the markup is as shown below - 

```sh
<div>
  <p>This is common content for desktop os.</p>
  <p data-relevant-key="windows" data-relevant-key-group="desktop">This is windows specific content</p>
  <p data-relevant-key="mac" data-relevant-key-group="desktop">This is mac specific content</p>
  <p data-relevant-key="linux" data-relevant-key-group="desktop">This is linux specific content</p>
  <p>This is also common content for desktop os</p>
</div>
<div>
  <p>This is common content for mobile os.</p>
  <p data-relevant-key="windows" data-relevant-key-group="mobile">This is windows specific content</p>
  <p data-relevant-key="ios" data-relevant-key-group="mobile">This is mac specific content</p>
  <p data-relevant-key="android" data-relevant-key-group="mobile">This is linux specific content</p>
  <p>This is also common content for desktop os</p>
</div>

```
If author want to show content for linux from desktop group and anroid from mobile group he will have to use showSpecificFromGroups api which accepts array of objects as shown below

```sh
const desktop = {name: "linux", group: "desktop"};
const mobile = {name: "android", group: "mobile"};
relevant.showSpecificFromGroups([desktop, mobile]);
```

Deciding on UI/UX for showing the relevant content will be author's responsibility. For the example above, software configuration example above, author can choose to identify the OS when the page is loaded and call the showSpecific function with correct value. 

The library exposes 3 public apis.
### **showAll()** 
- Shows all the content.
### **showSpecificFromGroup(name, group)** 
- Only shows content of the element within the group whose **data-relevant-key** attribute value matched the argument passed.
- *group* is optional parameter. If not given the element becomes part of special group called **data-relevant-key-group-none**.

### **showSpecificFromGroups(object)**
- Accepts array of objects as an argument. The structure of the object is {name: relevant-key-name, group: relevant-group-name}. For each such object, *group* is optional property. If not given, it is assumed to be part of special group called **data-relevant-key-group-none**.
- This api iterates over the array and calls **showSpecificFromGroup** for each array entry.


The library makes sure to restore the correct css display type of the element as shown in the **example1.html** in the repository.