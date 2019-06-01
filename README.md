## Welcome To My Electronic Journal

This is a tool I have built that helps me express myself, and allows me to have a private journal that exists nowhere else but my own computer.  I can write about my day with easy Markdown formatting, as well as save and comment on YouTube videos, pictures I've taken, and articles I've read.

The project started with a Jekyll blog template.  Entries were written in Sublime Text with "front matter" that included the title, date, and category of the blog post.  After saving it to the posts folder, it would be compiled to a static html page and served up by Jekyll.

Writing every day cemented the habit of keeping a journal, but the need for more control and a better way to enter, edit, and read posts could not be ignored.  I looked under the hood of Jekyll and was introduced to templating and the possibility of using variables inside html.  

I started working with Angular JS on a project at work, and decided to try using it for a journal, to become more familiar.  I started small with a read and write pane, and slowly added features.  After Angular 2 came out, I rewrote everything , with the wonderful help of Typescript, and upgraded again to Angular 5.

Bootstrap provides style and functionality.  

Elasticsearch is where everything is stored.

Node.js provides read and write capabilities to image files on my computer and serves them up, enables access to the YouTube Data API, gathers info from URLs that are inserted, allows downloads of YouTube videos with conversion to MP3, as well as provide ID3 cabpabilities for downloaded MP3 files.

## Write

The write pane accepts Markdown and has a toolbar to insert images, hyperlinks for YouTube videos and articles, and raw HTML (when I can't get it done the other three).  Also, the weather and current date are inserted into every new blog post.

A selected image from the computer hits the Node.js server that uploads it to a folder, and then serves it up locally.

When inserting a YouTube link, the Node.js server makes a call to  the YouTube Data API that grabs the title and a thumbnail image, and inserts that as a hyperlink.  An iframe was used originally, but the Angular pipe that converts Markdown reloads the iframe image every time a character is typed in the edit pane, and it gets on my nerves.  

The insert URL also hits the Node.js server to grab the title of the page using the Cheerio library and inserts it as a hyperlink.  

The image, YouTube video link, and URL hyperlink in the below post were all created using the insert toolbar.

![Write Screen](https://user-images.githubusercontent.com/11249870/58663572-af313180-82e1-11e9-9055-0cc7668dddef.JPG)

## Read

The read pane has two layouts.  The first has a list of posts on the left with a paginator at the bottom, and the formatted, selected post from the list on the right.  There is also a search box to find text in any post, a bookmarked toggle to select only bookmarked posts, a sort date that will reverse sort, and an alternate view that shows the posts on square cards instead of a list (not quite perfect).  

There are Edit Post, Delete, and bookmark buttons on the top of the formatted post.  

![Read Screen 1](https://user-images.githubusercontent.com/11249870/58662255-9d01c400-82de-11e9-8569-2c7b53f6f6e7.JPG)

If you click Edit Post, the edit pane will appear on the left where you can edit and update the post.  

![Read Screen 2](https://user-images.githubusercontent.com/11249870/58663521-8f017280-82e1-11e9-8b3d-51b440c74596.JPG)

A Show List button appears at the top of the formatted page to return to the list after editing.  

## YouTube download

This still needs some polish, but the general functionality works. 

After pasting the YouTube url in the top box, click on the YouTube button and it will retrieve the info from YouTube, including the thumbnail image.  

I wanted to auto-populate artist, title, and album from the information gathered from the YouTube Data API.  What is returned is very different for each video and it's hard to get a one size fits all recipe to extract specific elements.  I ended up running it through various regex filters to remove special characters and create separate phrases from the description and title.  These different phrases are available in the dropdowns to populate the fields.  You can see the phrases that are available under Tags in the screenshot below.  

Once you're satisfied with the info and all of the fields are populated, click download.  It will hit the Node.js server, which uses the youtube-dl library to download the video and FFmpeg to convert it to MP3. 

The get and set tags use the node-id3 library to read and write ID3 tags to the MP3 file that was just saved.  That functionality is a work in progress

![YouTube Download](https://user-images.githubusercontent.com/11249870/58671066-1fe24900-82f6-11e9-9c86-1e3aca226f03.JPG)

#### *Notes*  
  - API calls, which require a YouTube API account, are used to retrieve YouTube video information
  - Elasticsearch needs to be running with an index available.  The mapping is in Elasticsearch mapping.json in the root folder of this repo.  The index is journal and the type is journal_entry.
  - The Node.js server must be running to add images, retrieve URL and YouTube info, or download YouTube videos.  
  
#### *Credits*
 - I cannot thank  Maximilian Schwarzmüller enough.  His in depth courses on Angular JS and Angular showed me so much, including coding best practices, and how to really use Bootstrap.  I learned about React, Typescript, Javascript, CDNs, you name it.  It's all in his tutorials.
   - <a href="https://academind.com" target="_blank">Academind Website</a>
   - <a href="https://www.udemy.com/the-complete-guide-to-angular-2/" target="_blank">Academind on Udemy: Angular 8 Course</a>
   - <a href="https://www.youtube.com/channel/UCSJbGtTlrDami-tDGPUV9-w" target="_blank">  Academind YouTube Channel</a>
