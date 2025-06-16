import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReactMarkdown from 'react-markdown';
import Comments from './components/Comments';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

function Research() {
  // Format date to display in a readable format
  const formatDisplayDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  // Format date for comparison (YYYY-MM-DD)
  const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Parse a YYYY-MM-DD string as a local date
  function parseDateString(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  // Sample blog entries with dates as keys (Markdown supported)
  const blogEntries = {
    "2025-06-16": {
      content: `what a beautiful day.

(8:54am) good morning, going to dial in for the next few hours to finish this assignment.

      `
    },
    "2025-06-14": {
      content: `finished the assignment.

going to do further testing, later today but for now, i'm fairly happy with it.
i wrote a new article on contrastive learning. you can check it out [here](https://pranavpatnaik.com/writing/contrastive-learning).
i still need to figure out formatting on mobile. for now, it's great.

i've updated the site once more to include my guide to studying ML for the forseeable future. i'd like to dedicate the next few days to working on finishing it up.
you can check it out [here](https://pranavpatnaik.com/must-know) under /must-know.

(12:43pm) it's lunch time. when i return i'll study via the must-know document. 
      `
    },
    "2025-06-13": {
      content: `here's the idea.

- [ ] finish up assignment *
- [ ] work on inkwell, ping
- [ ] read papers
- [ ] leetcode
- [ ] post on twitter
- [ ] batch record

the assignment is top priority, so i'll work on that.
i'd like to pivot this portion of the website to discuss more research, so that'll motivate me to get to work, rather than just posting unfiltered thoughts.
i'll also be writing more articles, and posting them on the website.

looking forward to it.

<div style="text-align: center;">
<b><u>[sleep: 2:53am]</u></b>
</div>
      `
    },
    "2025-06-12": {
      content: `average day.

it's 2:44am on the 13th. i still haven't finished the assignment due on the 16th.
that's got me pulling my hairs at the moment, but i'll get it done.
i had GPT write out a full list of "must-know" concepts in ML and for the few i'm not quite familiar with, i'll dedicate my time to learning them.
besides that, i'd like to get to work on inkwell.
in fact, i'll work on that tonight.
i'll hop on figma and design the site.

besides that, i posted a new reel earlier today.

![reel](https://i.postimg.cc/SNKQg6hH/image.png)

fairly happy with it. i'm enjoying the process of making these videos.
will get back into the swing of things as far as research/work goes tomorrow.
      `
    },
    "2025-06-11": {
      content: `great day.

the reel on akinator blew up. i'm pretty happy about that.
it seems like my hard work and consistency is paying off, and it's starting to show.
i can't take any moment for granted and i can't slow down, especially not now.
spent the last bit working on a website.

i'm fairly happy with it, but i'll see in the morning i suppose.

![website](https://i.postimg.cc/W4npyMFP/Reshmi-Ravi.png)

either way, i'm proud of myself for grinding that out.
i think it looks cool.
i watched mission impossible: final reckoning earlier today.
fucking banger, what else can i say?
so much so that i recorded a reel right after.

![MI](https://i.postimg.cc/bv0nyCrD/image.png)

amongst the incredible action, set-pieces, and pretty great story, i'm fairly certain it's the best movie of the year, no doubt.
but besides that, there was a scene at the end that really stuck out to me.
luther begins a monologue in a recording to hunt, where in the middle of a pretty great neat bow to the mission impossible series, he mentions this:

<div style="text-align: center;">
<b><u>"any hope for a better future comes from willing that future into being"</u></b>
</div>

i'm not going to go ahead to launch into a think piece right here and now, but i'll say this:
mission: impossible, as crazy as it sounds, made me rethink life.
how much of my own choices have been made out of protecting myself?
out of doing the "reasonable" thing?
choosing what's smart over what i actually wanted?

discipline doesn't just mean balance, it also means intensity.
you can't half-ass your way into something that matters.
you have to be all-in.
watching the submarine & plane sequences made me realize how much i've been holding myself back.
i suppose that's what tom cruise wanted: for audiences to realize the human potential.

fascinating.

i'm going to go ahead and get to bed now.
i'll log back in tomorrow.

<div style="text-align: center;">
<b><u>[sleep: 3:42am]</u></b>
</div>
      `
    },
    "2025-06-09": {
      content: `it's 12:40am.

working on the assignment now, i'd like to get a siazble chunk of it done before the 11th.
i'm pretty much finished with task 1, it was rather straightforward.
i'll finish task 2 then head to bed.
most of the assignment resides in task 3, of which i'll finish tomorrow.

(1:04am) i've officially finished tasks 1 & 2. need to test some more but i'll be able to do that tomorrow. feeling happy with current results.
going to bed now.

(1:09am) never mind. i'm going to write some articles.

(1:48am) finished three articles: diffusion models, embeddings, and transformers.
i'm fairly happy with them, especially the embeddings one.

the goal is to write as many articles as possible.
hopefully i'll be able to send these out and grab attention using them.
creating a huge backlog of articles is key.
i'll aim for 5 before i go to sleep.
that means two more.
let's do it!

(2:50am) finished the fifth article. pretty damn happy with it.
going to sleep now.


<div style="text-align: center;">
<b><u>[sleep: 2:51am]</u></b>
</div>

---

<div style="text-align: center;">
<b><u>[wake: 10:30am]</u></b>
</div>

(12:32pm) while my mouth still tastes like toast, i'm going to work on the assignment now.





`
    },
    "2025-06-08": {
      content: `working on an assignment now.

it's 9:58am. woke up at 6:23am.
i've been reading the biography of Nikola Tesla,
it's a good read.
i usually spend the first hour of my day reading, without my phone.
i can't deal with the agitation of it all.

the notifications, the constant barrage of information-- it's too much for a brain that's still mush.
besides that, i'll have to work on this assignment. it's due on the 15th,
and office hours for it begin on the 11th.

(2:14pm) the moment i typed that out about 12 calls came in in a row.
now sitting down for assignment time.
      `
    },
    "2025-06-07": {
      content: `isn't it crazy how time just flies?

it's *june.* not sure how i feel about that.
half the year's over, have you made progress?
i feel like i certainly have, but i'm not sure if i've made enough.
i suppose that's a good feeling to have.
more to come.

let's talk about what i'll do today since i've planned it out. it's 2:11am.

- [ ] finish up assignments

this is due on the 16th. get it done.

- [ ] finish up ML projects

gotta have a backlog of projects we've been working on. compile everything we've done into a nice github repo.

- [ ] update "essays" section of website

write a few essays, jot down your thoughts, then upload them to the website.

- [ ] work on word2vec

i'm thinking about doing a video on it. how this is extremely simple.
it's merely the pytorvh that's throwing me off. this course isn't much help, it's extremely memorization focused.
might have to grab a textbook for this one.

we'll see.
either day, i'm going to bed now.

<div style="text-align: center;">
<b><u>[sleep: 2:13am]</u></b>
</div>

---

<div style="text-align: center;">
<b><u>[wake: 6:23am]</u></b>
</div>

(1:21pm) working on leetcode now.

31. Next Permutation

left it midway. going to record now.
got a great idea for a reel (AI imgs).

(1:37am) finished a new reel on embeddings. pretty happy with it.
going to sleep now. pretty nothing-burger day as far as productivity goes.

<div style="text-align: center;">
<b><u>[sleep: 1:37am]</u></b>
</div>
      `
    },
    "2025-06-06": {
      content: `what a day.

it's 1:52am, on the 7th of june. i'll write about the day.
i love posting content about ML.
consistent output is key.
the growth is consistent as well.

i need to be more powerful with the output, as well as the things i do.
today was a good day despite it not being a productive one.
i don't mind if i have days like these within sparseness, but i need to be in a hub of lockdown.
nonetheless, i enjoyed today.

posted a new reel on papers i'd recommend to beginners. fairly happy with it.

![reel](https://i.postimg.cc/c4nB2jsT/image.png)

tomorrow, priority #1 is to finish more of those miscellaneous ML projects i was thinking about earlier today.
moreover, finish up assignments. i've got one due on the 16th. i'd like to get it done sooner than later, then check up w/ TAs.

a late wakeup time completely fucks over the day.
i can't understand how anyone wakes up @ 12pm and is able to be motivated enough to do anything else besides slog around.
to each their own, but i'm not sure i'll ever be able to do that.
i'll also update the "essays" section of the website with my own essays.

- [ ] finish up assignments
- [ ] finish up ML projects
- [ ] update "essays" section of website
- [ ] work on word2vec

if you know me and you're reading this, feel free to reach out and see whether i've finished these by tomorrow, june 7th (that's today, by the time i'm writing this).
either way, i'm going to go ahead and get to bed.

one more thing before i leave to bed: the more i post, the more i realize how true this quote is:
"when you want something, the universe conspires in helping you achieve it."
ever since i started being more upfront in my posts, i've been getting non-stop support.
i'm extremely grateful for the support, and i'll never take it for granted.
it only pushes me to do more.

going to bed now. 

<div style="text-align: center;">
<b><u>[sleep: 2:06am]</u></b>
      `
    },
    "2025-06-05": {
      content: `it's 1:08am.

but it's june 6th. need to be more consistent with these posts.
pretty slow day overall, spent it meandering and working on videos.

i'm having way too much fun with these videos hahaha.
i put out a new one today on "bases."
i'm pretty sure it's one of my better videos.

![bases](https://i.postimg.cc/5tmKVMLm/image.png)

how do you know if something's a waste of time?
i'm not sure.
all i know is that i'm having fun making these videos.
every day, just a little bit more work done.

i'm making a video on "inkwell" tomorrow, editing it as i write this.
i'm such an impatient person, it's tough to record and work at the same time, but i'll keep working at it since this is what i want to do.

documenting my progress is key.
things won't happen overnight, but i'll keep working at it.
lately it feels like i'm just going through the motions, like i'm running through a tunnel with no light at the end of it.
where is the light?
where is the end of the tunnel?

i don't know, but i'll keep working at it.
i'll keep running.

that's all i can do.
      `
    },
    "2025-06-04": {
      content: `woke up early.

<div style="text-align: center;">
<b><u>[wake: 6:18am]</u></b>
</div>

i'm up.
reading "Advanced Data Structures Using 'C'" from the Sikkim Manipal University.
it's so old i'm guessing my father used it when he was in college.
old is gold, i suppose, since i'm actually learning a lot from it.

(1:26pm) just got home, working on the pytorch course now.

here's my code for reference:

<iframe src="https://nbviewer.org/github/pranavpatnaik1/introToPyTorch/blob/main/pytorchWorkflow.ipynb"
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>

---

(2:03pm) finished up some neetcode, watched 7 solved problems.
i'm really getting the hang of it now.
the more videos i watch, the faster i can do them, even before he explains the optimal solutions.

when effort meets consistency, magic happens.
i'll spend the rest of the day batch recording.

---

(1:20am) isn't it crazy how time just flies?
i need to get a better grasp on the things i do.
writing more thoughts down is a good sport.
i'd like to get more articles out, and plan out some more videos.

speaking of, i recorded a couple of videos today.

![reel](https://i.postimg.cc/50M4jzQy/image.png)

posted a new one, it's doing fairly well. it's one of my favorites as well.
i'm happy with these new string of videos recently.
gotta up the ante, though.

more storytelling, less "speaking" videos.
more importantly, more work done hahaha.

that makes me think-- i need to be doing more work where i can take a step back and say "i made progress."
rather than just "i finished x problems" or "i finished y chapters."
i'm obviously alluding to the projects i'm working on.

i'm thinking about commits, ping, and inkwell.
i made a video explaining "bases" earlier today, of which i'm pretty sure will turn out decent.
what i liked about those projects is i made such tangible progress.
but the thing is, seemingly "tangible progress" is often what makes you "feel good."

i've come to realize that i need to be doing more work that's actually "tangible."
although most progress comes in the form of the grind, i'll be damned if i'm not going to be doing more work that i can look back on and say "i did that."
so tomorrow, more projects. i promise.

for now, i'm going to bed.

<div style="text-align: center;">
<b><u>[sleep: 1:50am]</u></b>
</div>
`
    },
    "2025-06-03": {
      content: `it's 2am.

as always, let's plan out the day.

- [ ] pytorch course
- [ ] leetcode
- [ ] work on projects
- [ ] reimplement word2vec
- [ ] brainstorm writing papers
- [ ] work on cs assignment

i'm thinking of commits, ping, and inkwell.
since the reel yesterday, i've been getting DMs left and right about the projects.

by the end of today, i'd like to finish 01. PyTorch Workflow Fundamentals.
moreover, i'd like to finish word2vec, then write an article on it.
i'll also write articles about transformers and diffusion models.

anyway, i'm going to go ahead and get to bed.

<div style="text-align: center;">
<b><u>[sleep: 2:03am]</u></b>
</div>

---

<div style="text-align: center;">
<b><u>[wake: 6:12am]</u></b>
</div>

i'm up.
gotta love early mornings.

going to work on the pytorch course now.

here's my code for reference:

<iframe src="https://nbviewer.org/github/pranavpatnaik1/introToPyTorch/blob/main/pytorchWorkflow.ipynb"
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>

---

(1:28am) good day.
i'm really proud of the fact i got a reel out today, and it's one i'm actually proud of.
moreover, it's doing really well.
1.5k views in an hour @ 1am, and steadily growing.
i appreciate the immense support, i never take it for granted.

![resnet](https://i.postimg.cc/W4m0qYzV/image.png)

i'll go to sleep now. i'd rather wake up early tomorrow, to get a head start on the day and work harder.

<div style="text-align: center;">
<b><u>[sleep: 1:31am]</u></b>
</div>

great work today.
      `
    },
    "2025-06-02": {
      content: `another day.

it's 3:24am. i'm up, as always.
outlining the next day before it begins.

- [ ] batch record
- [ ] pytorch course
- [ ] leetcode
- [ ] work on projects
- [ ] reimplement word2vec
- [ ] brainstorm writing papers
- [ ] work on cs assignment

i'm incredibly excited for the pytorch course.
i've got a few ideas in mind for the "project" videos.
i'm thinking about doing commits, ping, and inkwell.
inkwell's gonna be a bitch of a project to design, but i'm up for the challenge.

the key idea is to just *finish.* don't just leave it half-assed, finish it the entire way.
that's the plan.

i'm going to bed now.

<div style="text-align: center;">
<b><u>[sleep: 4:01am]</u></b>
</div>

---

<div style="text-align: center;">
<b><u>[wake: 11:52am]</u></b>
</div>

even if it is summer, i hate waking up late.
it's better to just sleep early, then wake up at a reasonable time.
either way, i'm going to go ahead and finish up this new neetcode course.

i'm moving on to the "Advanced Algorithms" course now.
i haven't done this yet, but i'm excited to see what it's about.

starting off with arrays & Kadane's Algorithm.

![kadane](https://i.postimg.cc/85Qp8MhW/image.png)

---

(10:47pm) need more focus in my life.
my mind's consistently all over the place.

i'm thinking about so many different things, but that leads me to shallow results.
i need to just focus on one thing, then go all in.

let's set some tangible goals:

- [ ] 10 reimplementations by Friday
- [ ] neetcode advanced algorithms course finished by Wednesday
- [ ] tryinkwell.com MVP finished by Wednesday
- [ ] cs assignment finished by Friday
- [ ] pytorch course finished by Thursday

can't continue without deadlines. need to study harder.
going to continue the neetcode course now.
all about Kadane's Algorithm.

![kadane2](https://i.postimg.cc/6qX2LTzV/image.png)

(11:01pm) absolutely horrific explanation, no exaggeration.

i think i'll have to grab a textbook for this course.
at the very least, it's a good idea to have a reference.

---

(11:03pm) alright, time to burn the midnight oil with this pytorch course.
it's what i need to finish before i can really move on with paper reimplementations, unfortunately.

you can see my notes here:

<iframe src="https://nbviewer.org/github/pranavpatnaik1/introToPyTorch/blob/main/introToTensors.ipynb"
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>

(11:46pm) finished 00. PyTorch Fundamentals. long chapter.
moving on to 01. PyTorch Workflow Fundamentals.

---

(12:05pm) posted a *mid* reel today. on purpose.

![reel](https://i.postimg.cc/qMjtSZSV/image.png)

i hadn't planned on posting today, but i felt like continuing the streak. i believe that's now 10 days in a row.
woohoo!

(12:47am) was reading a blog from paul graham (or whoever it was) earlier today.

in it, they had a quote from lebron i really liked: 

<div style="text-align: center;">
<b>YOU'RE NOT A WINNER UNTIL YOU WIN AGAIN.</b>
</div>

been thinking a lot about that especially as i increase the output & consistency of my work.
reminds me to just keep going.
      `
    },
    "2025-06-01": {
      content: `good morning.

it's 2:18am. i'd like to jot down some more thoughts before i go to sleep.
reminding myself of my todo:

- [ ] pytorch course
- [ ] reimplemnt papers (word2vec, etc.)
- [ ] write papers
- [ ] leetcode
- [ ] build projects

also reminding myself of the following goals:

- [ ] 10 reimplementations
- [ ] 10 papers
- [ ] 10 projects

before i go to sleep, i'll brainstorm a few project ideas. things i could pump out in a bit.
my best advice (to myself) to pump out projects is to act like you're in a hackathon.
you're given a problem, and you have 24 hours to solve it.
you're allowed to use any resources you want.
you're allowed to team up with anyone you want (but you're solo hahaha).

i'll go ahead and brainstorm a few project ideas now, then go to sleep.

**[sleep: 2:40am]**

---

**[wake: 6:30am]**

i'm up.

brainstormed a few project ideas. now it's just time to build.

projects:
- sessions
- ping
- inkwell
- commits

the name of the game is speed. i'd like to pump these out as soon as possible.

---

"if you aren't him today, you'll never be him."
i've got a pretty specific idea of the person i'd like to become.
it takes a lot of effort stay on track, but i'm up for the challenge.
however, whenever i feel like i might be going off that path, i just remind myself of this quote.
i remind myself that if i'm willing to be him today, then i'm not going to be him for the rest of my life.

so i remind myself whenever it gets hard,

this is what i want.

this is what i asked for.

---

(1:14am) got a few assignments done.

![assignments](https://i.postimg.cc/vB8h53cH/image.png)

![assignments2](https://i.postimg.cc/3xRGhNdN/image.png)

i've still the huge one due on the 15th, but at least i've gotten these smaller ones out of the way.

i spent a large portion of the day thinking about content.
i've jotted all of my ideas down into this list:

![content](https://i.postimg.cc/qRrzZvK1/image.png)

first, i'll mention that signal > everything.
it doesn't matter about the views, the comments, the likes, the shares, the saves, etc.
what matters is the signal the post sends out.

"this guy's doing something cool."
"this guy's really good at this."
"this guy's got a cool idea."
"he's working on something new."
etc. etc.

moreover, the priority should be to set up long term growth.
long-term projects, long-term content = long-term community. 

for my own convenience, i've split future content into six categories:

- "explainer" videos

these are videos where i explain a concept in a way that's easy to understand.
things like "what is a neural network?" or "what is a convolutional neural network?" etc. etc.

- "project" videos

these are videos where i build a project.
i've got commits, ping, inkwell, and sessions on the list right now.
excited for inkwell & ping.

- "mindset" videos

these are videos where i talk about my own personal journey.
i'll be honest, i'm not sure how many of these i'll make.
it'll come to me as i go along.

- "research" videos

these are videos where i explain papers, or document myself reimplementing them or writing new ones.
these are totally signal boosters, so i'll be making a lot of them.
i also love reading & explaining papers, so this should be a lot of fun.

- youtube

i want to make longer form content for youtube.
content about ML, research, projects i build, and life in general.

- "algorithm attackers"

these are videos that will hit the algorithm no matter what.
extremely simple and general, but they shouldn't be made too often.

the plan is to make two of these every week or so, hook new people in.

so, between the "explainer", "project", "mindset", "youtube", "research" videos, and the "algorithm attackers", i should be set.

---

(1:40am) i'm gonna go ahead and get some neetcode done, then head to bed.

current lesson: Heapify.

![heapify](https://i.postimg.cc/NMhsnYNC/image.png)

i can appreciate the amount of work that goes into proving menial things like heapify's time complexity being O(n).
i'm not going to lie, it's a bit of a pain.
but in the grand scheme of things, it's not that bad.

moving on to the next chapter: Hashing

more specifically, Hash Usage.

![hashusage](https://i.postimg.cc/pLz5X0gS/image.png)

it's pretty simple.
i like hearing about the differences in time complexities between different data structures.
neetcode does a good job of explaining the tradeoffs.
it's always great to be able to reason about these things.

moving on to Hash Implementation.

![hashimplementation](https://i.postimg.cc/PJZW1tCW/image.png)

i remember why i skipped this.
needlessly tedious.

here's my notes on hash implementation:

![hashimplementationnotes](https://i.postimg.cc/wMSk9jwS/image.png)
![hashimplementationnotes2](https://i.postimg.cc/PqwvkQgr/image.png)

finally moving on to graphs! so exciting. i love this chapter.

![graphs](https://i.postimg.cc/g2v6sSkW/image.png)

learning more about the different ways to represent graphs was pretty interesting.

- matrix, use (r, c)
- adjacency matrix

given the graph, we may say an adjacency matrix defines the relationship the graph has w/ is nodes.
adjMatrix[r][c] = 1 means there exists an edge between node r and node c.

though, this is a waste of space so this implementation tends to never be used.

- adjacency list

this is a much more efficient way of representing a graph.
it's an actual class implementation, sort of like an n-ary tree.

skipping over Matrix BFS & DFS. these are way too huge to cover here.

i'll attach my notes for graphs here:

![graphsnotes1](https://i.postimg.cc/rF8zzkr4/image.png)
![graphsnotes](https://i.postimg.cc/26FX5vsn/image.png)





      `
    },
    "2025-05-31": {
      content: `it's a beautiful day.

i'm up early. it's 6:42am.
<div style="text-align: center;">
<b><u>[wake: 3:50am]</u></b>
</div>

gonna continue the heaps explanation here.

**heaps / priority queues:**

heaps are merely arrays kept in a special order, of which can represent a tree.
the way the array's ordered is typically based on priority, hence the name "priority queue."

there's two types of heaps:

- max heap: parent node is greater than children
- min heap: parent node is less than children

heaps have a few properties:

- (heap property): parent node is greater than children (max heap) / less than children (min heap)
- complete binary tree: every level is filled except the last, which is filled from left to right

heaps are typically implemented using arrays.
so, we can access the parent node by using the index of the child node.

- parent node index: (i - 1) // 2
- left child node index: 2i + 1
- right child node index: 2i + 2

![heap](https://i.postimg.cc/jdNmTKpd/image.png)

so, all in all, heaps are a pretty simple concept.
they're just arrays with a strict way of being organized.

---

(12:44am) going to work on a website now.

finished up a bit of the design i had in mind. need to check quality but that's about it.
will likely facilitate payment via Stripe API, but i'm still not sure if that's what's needed. i'll see.

i'm going to move on to do some leetcode & brainstorm more project ideas later tonight.
gonna speedrun projects and put them all right here.
`
    },
    "2025-05-30": {
      content: `good morning.

it's 1:21am. i'm up-- not for long, though.
i've found this pytorch course i'd like to go through.
it's 25 hours long, so i'll be able to go through it over the next few days.

i'm starting to think through new ways to express my content. lately, i've been loving this guy [sachin](https://www.instagram.com/thrift.detective/).
great posts, great content.
he's got such a natural way of speaking in his reels it made me realize i've been thinking about all of this completely wrong.

i've been so strung up, almost puppeteering myself in these reels to pump out a version of me (of which exists) that isn't my highest authentic self.
i need to get better at capturing authenticity and cool ideas.
been thinking about this a lot lately, so i'll go ahead and move on to the pytorch course now.

i think i'll make a reel about "is it possible to learn ML in 24 hours?"
something like that should be fun.

besides that, i should be aiming to write papers. that's the main goal.
to get there, i need to reimplement more.
here's the todo (in order):

- [ ] pytorch course
- [ ] reimplemnt papers (word2vec, etc.)
- [ ] write papers

the pytorch course shouldn't take longer than 2-3 days of relentless work & focus.
i'm tired of coming across new ideas & not being able to implement them.

this way, with this pytorch course, i'll be able to cut through ideas like butter.
here's your mantra:

- make actual progress, then document it.

easy as that. capture raw, unfiltered ideas & thinking. elevate it using your own voice.
post, polish, repeat.

it's also hit me that my ideas are fucking awesome. i'm not just saying that, but it's true.
bnto made me realize that i need to trust my gut and build shit out before consulting anyone's opinion.
no one is you. no one is going think like you do.

be quick, build out projects fast, then repeat.

goal:

- [ ] 10 reimplementations
- [ ] 10 papers
- [ ] 10 projects

i'll brainstorm more tomorrow about the side projects, but i'm pretty confident i'll make a banger.
see you then.

i'll go ahead and sleep now. it's getting late.

**[sleep: 1:31am]**

---

**[wake: 9:34am]**

all i want to do is sleep.
and work.
nothing else.

i'm so pumped.

it is 12:04pm. i'm going to work on the pytorch course now.

![image](https://i.postimg.cc/L4Y5jdGV/image.png)

(12:39pm) okay. not a fan of the course so far. i'd rather just do the online textbook.

![textbook](https://i.postimg.cc/yx7273gP/image.png)

here's my code for now, figured out how to embed it:

<iframe src="https://nbviewer.org/github/pranavpatnaik1/introToPyTorch/blob/main/introToTensors.ipynb"
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>

this should update as i go along.

(1:45pm) spent the last few minutes working on the embedding portion. now i'm able to show off my code on this website.
nice.

gonna go work on the next reel now. it's nearly 2 and i haven't posted.

(10:21pm) posted the reel. it's doing fairly well. 
the more i post, the more i realize what matters isn't views, but signal.

![signal](https://i.postimg.cc/gj0GtM2h/image.png)

that's 7 posts in a row. 8 posts if we're counting this "new era" i've been in.
i think that's my longest streak ever. that's pretty insane to think about.

*never mind*. i've had a longer streak during my exam season period last year. but pretty soon, i'll pass that.
it's pretty cool to think about. during that period, i was so damn stressed out.
now, posting's effortless. i'm chilling.
consistency doesn't even feel difficult.

you just gotta stop thinking about the views so damn much.
views don't matter. it's the signal the posts send out.
as ego-driven as it sounds, the current content sends a signal of:
"wow this guy's really good at this." or "this guy's doing something really cool."

the come-up is slow but steady. consistency is key. and the signal we're putting out is strong.
i'd rather have 1000 true fans than 100k fake ones.
with that being said, i'd like to pivot my content to be more jumpy; closer to my personality.

i was writing to my friend sambhav about ways to improve content, and i'll attach them here since i believe them to be important.

![improvements](https://i.postimg.cc/hv7MbnR3/image.png)
![improvements2](https://i.postimg.cc/mrbgsTLx/image.png)
![improvements3](https://i.postimg.cc/9Xp36y4f/image.png)

following these should improve my content; the signal i'm putting out.
i'm not stressed over the "content" part anymore. i'm just going to post whatever i want.
i don't want to be stuck in a cycle of "optimizing" for views.
now, i'm just going to post whatever i want and optimize for authenticity.

(1:24am) finished another reel. it'll be up tomorrow @ 12pm.
very proud of it. can't wait to see how it does.
gonna do some leetcode now, just a bit to keep the streak going.
i'm tired as shit, but i wanna get this done and out of the way.

(3:56am) jolted awake. i suppose the mere thought of not doing leetcode was too much...
kidding. i'm gonna go ahead and do some leetcode now.

i'm on the "Push and Pop" lesson in neetcode.

![pushandpop](https://i.postimg.cc/x86pCdPB/image.png)

(4:18am) wow i hate heaps. hahahah i barely understand shit.
i'll give it some time and thought, then try again later.
what a strange concept, but it seems simple enough.

i'll try explaining it here (tomorrow)
      `
    },
    "2025-05-29": {
      content: `good morning.

(3:31am) it's 3:31am. i'm up.

not for long. i'm just typing out what i'd like to do after i wake up.

- leetcode (finish trees, associated problems)
- edit content (cold email reel?)
- research (finish word2vec)

i'll also go ahead and update the site with projects + other essays i've written.
ok. can't think straight. gotta go to sleep. will update in the morning.

**[sleep: 3:36am]**

---

**[wake: 10:10am]**

(12:08pm) going to go ahead and start leetcode now.

i'm gonna try again to do the leetcode problem i started yesterday. "Construct Binary Tree from Preorder and Inorder Traversal" was pretty strange, so i'm gonna do it again.

what does each traversal give us?

- preorder: root, left, right
- inorder: left, root, right
- postorder: left, right, root

now, we know that the first element in preorder is the root.
so, we can find the root in inorder, and split the left and right subtrees.
we quickly find a recursive solution by doing this.

(1:45pm) i'm getting stuck on this one problem; i'm moving on for now.
it's way too tricky to relate the preorder index to the inorder index.
continuing on with neetcode now.

(3:12pm) finished two leetcode problems:

- Binary Tree Level Order Traversal (Medium)

![soln](https://i.postimg.cc/Jhz1Ctdr/image.png)

- Binary Tree Right Side View (Medium)

![soln](https://i.postimg.cc/rstCpVs3/image.png)

the Binary Tree Right Side View problem is funny, but it's not that bad. it was just a matter of returning the final node of the level.
gotta get used to thinking of trees in that sense.

moving on to Backtracking now.

(3:31pm) backtracking is fucking stupid. unfortunately, i'm pretty bad at it. i'll keep working at it, but for now i'll move on to Heap / Priority Queue in the course.

heap / priority queue is a more intuitive concept, so i'll be able to do more with it.

![heap](https://i.postimg.cc/Wb1fM2PQ/image.png)

(4:13pm) taking a break now.

(12:58am) spent the rest of the day working on the word2vec paper & chilling. not much else of worth to mention.
going to work on. going to switch to tomorrow's entry now.

goodnight.
      `
    },
    "2025-05-28": {
      content: `good morning. it's 11:12am, time to get to work.

i'm at uni for two hours, i'll spend this time working on the Word2Vec paper, then leetcode.

(1:58am) spent the day working on the paper. got some good progress in, i'll have to think about how to make this into a reel.
it's becoming evident that to make a good reel, telling a "story" is key.
so, whether it's a challenge i came across, or a problem i solved, or a new concept i learned, or a new project i'm working on, etc. i'll make sure to keep note of it.

finished up a new reel: "3 books." frankly, i'm pretty happy with how it turned out.
i'm also going to finish another reel before the end of tonight. should be able to sleep @ 3am.

no leetcode today. woohoo

okay, nvm. i'll go ahead and do some leetcode just to continue the streak.

going through neetcode now:

- reviewing depth-first search:

![depthfirstsearch](https://i.postimg.cc/3wG596sB/image.png)

pausing the course for now to review a key insight on reducing addition in time complexity.
given some addition time complexity O(n + n log n), we can "reduce" it O(n log n).

why? because n log n is larger than n, for all n > 10.

![insight](https://i.postimg.cc/nhMVvnn9/image.png)

in other words, it bounds it.
remember, big O notation is all about the upper bound.
now, we understand that constants don't matter when it comes to big O notation.

here's a clean and simple way of thinking about it:

![insight2](https://i.postimg.cc/y8bf3FT9/image.png)

anyway. it's always great to be able to review concepts i've already learned.
attaching this as reference for DFS:

![dfs](https://i.postimg.cc/ZYBk55FC/image.png)

alright. moving onto some problems now.

- Binary Tree Inorder Traversal (Easy)

![binarytreeinordertraversal](https://i.postimg.cc/dt1tjyCn/image.png)

easy enough.

- Kth Smallest Element in a BST (Medium)

![kthsmallestinbst](https://i.postimg.cc/Dw04jzWd/image.png)

this one's slightly more challenging solely due to the early-stopping idea of making it more optimal.
i didn't implement it here, but i'll go ahead and think about it some more.

(3:01am) implemented the early-stopping idea. instead of the sub-optimal soln, where i return inorder[k - 1] (since it has to traverse the entire tree), i'll keep track of k.
i'll keep track of k via a counter, usbtract it & the kth node i visit in the inorder traversal is the kth smallest.

works like a charm.

![kthsmallestinbstsoln](https://i.postimg.cc/xdmxs4R0/image.png)

i think i'll do one more problem, then go to sleep.

- Construct Binary Tree from Preorder and Inorder Traversal (Medium)

finished, but left with an extremely inefficent soln (used .index() to find the root in inorder).

![constructbinarytreefrompreorderandinordertraversal](https://i.postimg.cc/W4Mzw0dd/image.png)

i'll go ahead and implement a better soln tomorrow. for now, i'm gonna go to sleep.

notes from tn:

![notes](https://i.postimg.cc/fymndf2L/image.png)
![notes2](https://i.postimg.cc/yxVXhVnZ/image.png)
      `
    },
    "2025-05-27": {
      content: `pretty mid day overall

the reel i posted today didn't do well.
i suppose that's to be expected since it's rather technical, but it's still disheartening.
i also barely got any work done today-- leetcode or otherwise.

after i'm done typing this up, i'll go ahead and do some leetcode.
i'm not sure what i'll do yet.

i'll keep reminding myself that i'm not where i want to be. not close to it.
that even if you're working hard, and you're still not where you want to be, it's not because you're not enough.
i need more time in the lab, pay my dues, and grind things out.

i've been listening to "DtMF" on repeat. pretty fucking good song, lol

in all honesty, i was hoping to get more done today.
but it was a good time to take a break and clear my head.

i can't stay too bummed out about today, though. i've a lot on my mind (and on my plate), but it's not worth shitting the bed over.
i could go on and on about how i deserve more, and i don't deserve to be treated this way by God, but that's not the point.

"i'm so unlucky!" "i'm fuuuuucked!" "whatever am i gonna do?"

keep working, lol.

every day that i spend working, it's cementing the person i'm becoming.
i'm not where i want to be, but i'm not where i was.

that's all that matters.

---

gonna go ahead and work on a cs assignment now.

side note: i was beating myself up all day in the group chat over the last reel's performance

![pranavpatnaikperf](https://i.postimg.cc/yxhd9d2s/image.png)

but i got a couple of great messaegs, i'll attach them below:

![editinggood](https://i.postimg.cc/T3V9wqt4/image.png)
![editinggood2](https://i.postimg.cc/6pcMcfCG/image.png)
![editinggood3](https://i.postimg.cc/DwNX7WTM/image.png)

hell yeah. incredily grateful. feels dope as hell to be able to help people and be appreciated for it.
fate's totally shat on me lately, but i'm not about to let that stop me from being great.

(12:03am) gonna go ahead and work on the assignment now.

(4:12am) worked on the assignment for a little bit. not that bad.

gonna hit the hay soon.
`
    },
    "2025-05-26": {
      content: `it's 3:06am; let's plan out the day.

- leetcode (Tree, Backtracking, Heap/Priority Queue)
- research (word2vec)
- content (script about studying)

before i go to bed, i'm gonna go for another leetcode problem. it's an easy: Guess Number Higher or Lower.
seems like a rather simple Binary Search variation.

(3:22am) finished it. like i said, a rather simple Binary Search variation.

![guessnumber](https://i.postimg.cc/8zyPrMjv/image.png)

here's my soln:

- Guess Number Higher or Lower (Easy)

![guessnumbersoln](https://i.postimg.cc/C5NdPtLP/image.png)

(3:26am) gonna hit the hay now. long day tomorrow.

---

(12:55am) it's now 12:55am in the NEXT DAY (2025/05/27) hahaha, but i'll recount how the day went.
spent the day working on recording, editing, and posting videos.
it's imperative that i get into the swing of things content, since that's really the mode of vertical growth that i'm gambling on, besides networking & overall work output.
besides that, i finished up the week 4 prep for 148. i'm gonna take a look at the assignment later tonight (or tomorrow).

it's been more challenging than i thought it'd be to get back into the swing of things for *research.*
it requires rather a lot of focus, something i've been rather lacking of late (due to content).
hopefully i'll be able to do more of it later on; i've been loving the neetcode course.

(1:04am) gonna go ahead and try the suggested neetcode problems. up next: "First Bad Version." scary!

- First Bad Version (Easy)

![firstbadversion](https://i.postimg.cc/zXrwnXdC/image.png)

less challenging that i thought i'd be. just another binary search variation.
now moving onto "Koko Eating Bananas."

- Koko Eating Bananas (Medium)

![kokoeatingbananas](https://i.postimg.cc/ZRdBnRQv/image.png)

it's yet another binary search variation, this time also with finding the "smallest" maximum value.
slightly more challenging than the previous one, but not by much. got it done.
going to move on to the rest of the course now.
trees, baby!

- Search in a Binary Search Tree (Easy)

![searchinabinarysearchtree](https://i.postimg.cc/xCjw0x1X/image.png)

extremely easy, of course. reminds me of 148.

- Insert into a Binary Search Tree (Medium)

![insertintoabinarysearchtree](https://i.postimg.cc/52tBBD24/image.png)

again. this is ripped straight from 148. moving onto the next one: Delete Node in a BST.
this one's probably gonna be slightly more challegning, due to all the must-consider cases:

- one child
- two children (minValue)

i suppose that isn't too many cases, hahaha. okay, moving on. let's do this

- Delete Node in a BST (Medium)

![deletenodeinabinarysearchtree](https://i.postimg.cc/B6jVL9Yt/image.png)

like i said, it's a bit more challenging.
i'll take a slight break, then move on to the next section. i'm sort of itching to see how this recording looks hahahaha.
that's the issue with recording myself- i'm so conscious about the damn camera. i'm sat like a fucking brick right now
      `
    },
    "2025-05-25": {
      content: `spending today on three things:

- fastai course
- leetcode
- recording a script

i'll finish up the video i was working on before about reimplementing papers, then finish up the script i'm working on.
i haven't even brushed my teeth yet. been busy with emails. should probably get on that.

(2:48pm) starting the fastai course now.

(3:15pm) this course is pretty dogshit. i'm better off using my time reading papers and reimplementing them.
will go ahead and do that now.

(3:44pm) finished up some work Word2Vec. will go ahead and record the script i've been sitting on for a while now.

(12:47am) update: ended up recording four videos. batch recording is a godsend.
the current workflow is as follows:

- record
- script
- spend the rest of the week editing videos

i got 4 videos done, but i'm almost certain i could have done more. maybe even 7.
the thing is, too: i'm proud of the videos i did do. they're good. very good.

![batch recording](https://i.postimg.cc/Kvyb2g2x/image.png)

posted a new [video](https://www.instagram.com/reel/DKDnh0kM48w/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==) today.
i'm proud of it. it represents a new shift in how i want to post on instagram.

i'll be doing a lot more of this. posting about research, papers, and all that good stuff.

i'm gonna spend the rest of the night working on leetcode, but before i do that, i've a letter to write.

(2:06am) finished the letter, finished a new video, but i'm conked out.

going to bed now.

(2:37pm) wrote another letter hahaha.

should definitely get to bed now.
      `
    },
    "2025-05-23": {
      content: `long day @ uni today.
      
(4:41pm) working on leetcode now.
      
finished a problem:

- Binary Search (Easy)

![soln](https://i.postimg.cc/hPqXVdQk/image.png)

(9:43pm) spent the day at uni, didn't get much work done.

i'll be doing a seminar on leetcode in a few minutes,
but after that i'll be working on this fastai course.

i'd better get on posting reels and getting into the flow of things.
it's rather frustrating that i'm finding myself at the end of days, with 0 progress and nothing to show for it.

all that tells me is that i lack urgency.
i'm pretty sure i can come up with a list of reasons why.

i'm more than capable of being where i want to be; i just need to be willing to put in the work. 
i can define three categories that need to be addressed in my career:

- leetcode (for interview prep)
- research (for my own knowledge, and for the sake of my own projects)
- content creation (personal brand)

tackling all of these is more than possible. 
i just need time by myself. time in the workshop, time in the lab, time in the library, time in the field.

this is the first time i've felt like i'm on the right track in a while. 
there's a very obvious reason for that. 
but i'm still not where i want to be. 
i'm right there. i'm so fucking close to where i want to be i can taste it.

tomorrow's saturday. i'll be at it all day. tonight, i'll go ahead and finish up this fastai course, then work on some leetcode some more. it's 

it's times like these that i need to remind myself that i love computer science, 
and i'll be damned if i'm not going to make something of myself.
i feel that what has me letting me off the accelerator is i know exactly what i need to do.
the path ahead is clear as day.

now it's just up to me to execute.

i've been handed a golden ticket, and i'm not about to let it slip through my fingers.

(1:02am) working on the fastai course now.


`

    },
    "2025-05-22": {
      content: `spent the day working on this website.

not sure how much more i can do to it. will have to update the 'projects' and 'writing' sections with their respective content.

need to fix the calendar to show the correct dates, and make everything look a bit cleaner.

(9:22pm) gonna spend the rest of the night working on this website, then go do some leetcode/neetcode.

i'm thinking of doing a 'what i've been up to' series of posts on instagram.

i'll have to think about it some more.

(12:15am) leetcode time.

- 206. Reverse Linked List (Easy)

![RLL Soln](https://i.postimg.cc/vZK77Zgs/image.png)

---

- 23. Merge K Sorted Lists (Hard)

![MKSOLN](https://i.postimg.cc/sDRPv6B4/image.png)

the first problem was rather easy, with the second one being a bit of a struggle. i'm not sure why.

creating a helper function to merge two lists was a good idea. thought of that first, but the implementation of the merge later on was slightly more tricky to think of.

(1:38am) going to go ahead and finish up a script.

![script](https://i.postimg.cc/rmX0VLkk/image.png)

finished a couple of script ideas. got 20 reels locked in.

the series of reimplementing papers is something i'm thinking of doing.

gonna have to implement a couple of foundational papers first for that one to work out. i'll get on that when i wake up tomorrow.

for now, i'm gonna go ahead and sleep.

      `
    },
    "2025-05-20": {
      content: `least productive day i've had in a while.
      
good day to recharge and visit the girlfriend, especially since she's sick today. 
      
note to self: have a laptop charger on your person at all times.
gonna work on leetcode/neetcode for the rest of the night and call it a day.

---

it's 10:53pm and i still haven't started neetcode/leetcode. why?

i'm too lazy to get up from my seat, go downstairs, and grab my ipad to take notes on.

writing that out made me realize how stupid that sounds. give me a sec..

- (10:56pm) i'm back. time to get to work.

- (11:33pm) finished "1700. Number of Students Unable to Eat Lunch," an easy leetcode problem.
`},

    "2025-05-21": {
      content: `found new resources to check out for AI/ML.

- [fastAI](https://course.fast.ai/) 
- [cs231](https://cs231n.stanford.edu/) & [cs224](https://web.stanford.edu/class/cs224n/) from stanford

current priority should be finishing up this fastAI course (pt1 & 2).

it seems to have every concept you need to progress further in AI/ML.

oh man. it's quickly becoming a habit.

this marks, what, four days of doing nearly nothing? i must be going insane`

    },
    "2025-05-19": {
      content: `woohoo! love it when we have three wacko days back-to-back-to-back. the only productive thing i did all day was record a bit on the train and do some yard work hahaha. i suppose the long weekend really took it out of me. 

got to call my girlfriend a ton today

she's sick right now but in my mind we're holding hands as she gets better. i'm not gonna slow down.

i feel like my work right now is a sacrifice to God so she feels better in the morning.

i'm gonna spend the next hour finishing up this video, then move on to leetcode/neetcode, then sleep.`
      
    },
    "2025-05-18": {
      content: `boom. transformative day.

luckily, i know what to do. more of this and i'll reach my potential

easy enough

---

- posted tweet
- wrote script, recording tomorrow

---

how do i write an instagram script about something as boring as research?

probably through recording what i do daily. it'll be boring but probably useful for a lot of people. 

"summer's a time to relax and have fun, but unfortunately for me both of those come in the form of studying even harder."

---

mid day.

no leetcode, no neetcode, 0 research, 0 work on mathema…

but at least i got a post down. and its my favorite post ever. also posted on twitter as well. gotta make that more of an easy, daily thing. i suppose *daily* posts on twitter just means a high-quality post, like a paper analysis or whatever.

might have to start a blog website. like, pranav.me or some shit.`
    },
    "2025-05-17": {
      content: `slow day.

worked on annotating a research paper i found on the front-page of PapersWithCode: FastVLM: Efficient Vision Encoding for Vision Language Models. i'll attach my annotations here shortly. 

{ [paper](https://arxiv.org/pdf/2412.13303v1) | [annotations](https://docs.google.com/presentation/d/1xJYhqJscslMR9QqU9m7K48u4xZRPL-QOxQ28GLF7TQM/edit?usp=sharing) }

besides that, i finished up some more of this course (AWS ML Specialist). booooooring but it finishes my "exploratory reading" task. it's 8:37pm right now: i'll finish up some leetcode/neetcode prep, quickly make a post on twitter, and do some linear algebra.

didn't work on mathema in the slightest. bummer

---

made a quick pipeline to most basic research papers:
	
1. data

2. model

    a. class that inherits from nn.Module

    b. define layers in __init__()

    c. forward() method

3. loss function

    a. nn.MSELoss

    b. nn.CrossEntropyLoss

    c. nn.BCELoss

4. optimizer

    a. torch.optim.sgd

    b. torch.optim.Adam

5. training loop

    a. make prediction, compute loss

    b. backpropagation

    c. update weights
    
6. evaluation

    a. accuracy, BLEU, F1, perplexity, etc.

---

finished neetcode prep:
- Dynamic Arrays
- Singly Linked Lists

re-doing neetcode is pretty embarrassing, but i guess it's never a bad thing to review foundations & first principles. time complexity is something i struggle remembering, so at the very least i got to review that.

finished leetcode problems:
- Merge Two Sorted Lists (1)
- Reverse Linked List (2)

these two problems were rather easy. the first problem (1) was a slight struggle, but i got it in the end. i'm pretty rusty

will post on twitter about the paper in a bit. gonna go play spider-man w/ the fam now
      `
    }
  };

  // Find the most recent entry date
  const findMostRecentEntry = () => {
    const today = formatDateKey(new Date());
    if (blogEntries[today]) return today;
    const dates = Object.keys(blogEntries).sort().reverse();
    return dates.length > 0 ? dates[0] : today;
  };

  // State for selected date (store as string key)
  const [selectedDate, setSelectedDate] = useState(findMostRecentEntry());

  // Handle date change from calendar
  const handleDateChange = (date) => {
    setSelectedDate(formatDateKey(date));
  };

  // Get entries for display
  const getEntriesToDisplay = () => {
    return Object.entries(blogEntries)
      .map(([dateStr, entry]) => ({
        date: dateStr,
        content: entry.content
      }))
      .sort((a, b) => b.date.localeCompare(a.date)); // Sort by date string (newest first)
  };

  // Get selected entry
  const getSelectedEntry = () => {
    return blogEntries[selectedDate]
      ? { date: selectedDate, content: blogEntries[selectedDate].content }
      : null;
  };

  // Highlight dates with entries in the calendar
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = formatDateKey(date);
      return blogEntries[dateKey] ? 'has-entry' : null;
    }
  };

  const selectedEntry = getSelectedEntry();
  const entries = getEntriesToDisplay();

  return (
    <div className="blog-content">
      {selectedEntry && selectedEntry.content ? (
        <div className="selected-entry">
          <h2>{formatDisplayDate(parseDateString(selectedEntry.date))}</h2>
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            remarkPlugins={[remarkMath]}
          >
            {selectedEntry.content}
          </ReactMarkdown>
          <Comments entryDate={selectedEntry.date} />
        </div>
      ) : (
        <div className="no-entry">
          <h2>{formatDisplayDate(parseDateString(selectedDate))}</h2>
          <p className="empty-message">nothing to see here, check later!</p>
        </div>
      )}

      <div className="entry-divider">
        <hr />
        <span>previous entries</span>
        <hr />
      </div>

      <div className="blog-posts">
        {entries.map((entry, index) => {
          const isActive = selectedDate === entry.date;
          // Remove Markdown for preview, just show plain text
          const plainText = entry.content.replace(/!\[.*?\]\(.*?\)/g, '') // remove images
                                         .replace(/[#>*_`~\-]/g, '')      // remove markdown symbols
                                         .replace(/\[(.*?)\]\(.*?\)/g, '$1'); // remove links, keep text
          const previewText =
            plainText.length > 100
              ? plainText.slice(0, 100) + "..."
              : plainText;

          return (
            <div
              key={entry.date}
              className={`blog-post ${isActive ? 'active' : ''}`}
              style={{ '--post-index': index }}
              onClick={() => setSelectedDate(entry.date)}
            >
              <h3>{formatDisplayDate(parseDateString(entry.date))}</h3>
              {isActive ? (
                <ReactMarkdown>{entry.content}</ReactMarkdown>
              ) : (
                <div className="blog-post-preview">{previewText}</div>
              )}
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Research; 