import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReactMarkdown from 'react-markdown';
import Comments from './components/Comments';

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
      `
    },
    "2025-05-27": {
      content: `pretty shit day overall

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
      content: `it's 2:49am, i'm about to go to bed.

after i wake up in the morning, i'll work on three things:

- leetcode
- recording/editing videos
- reimplementing Word2Vec

i'm nearly finished with the cold email reel. will go ahead and finish it up tomorrow.
in all honesty, i really should finish up some more cold emails. i've been slacking on that.

i've also been slacking on school work. need to get on that cs prep & assignment.

csc148:
- prep, prep quiz
- assignment

moreover, need to update my resume. specifically need to add everything i've done over the last few months.

- 4.0 gpa
- mathema, $80k
- @pranavpatnaik_, 5k followers
- several misc. research projects in ML
- hackathons won
- ...among other things

(10:53pm) posted a new [reel](https://www.instagram.com/reel/DKFIoZzNs6M/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==).
didn't think it'd do well, but it's doing much better than i expected. will have to go ahead and post a reel about the cold email template soon.

![cold email reel](https://i.postimg.cc/t4P5MTpY/image.png) 

though, i admittedly haven't done much work on research lately.
i've been busy with other misc. things, like getting back into the rhythm of posting again, but that really shouldn't be an excuse.

i'll be working on the word2vec paper tomorrow.
then, i'll post the new reel i've been editing.

i'm liking this new rhythm. more of this, please.
gonna spend the rest of the night doing leetcode.

---

(1:04am) did the neetcode course, brushed up on Insertion Sort & MergeSort.

- Insertion Sort
![neetcode](https://i.postimg.cc/c45h0Hmx/image.png)

- MergeSort
![mergesort](https://i.postimg.cc/NMH8s7dB/image.png)

- MergeSort Time Complexity
![mstime](https://i.postimg.cc/Qx07ryjc/image.png)

rewatching the neetcode course like it's the first time really lets me appreciate the course.
i just racked up a new-found understanding of the huge difference between O(n) and O(log n) besides merely looking at the graphs.

![neetcode](https://i.postimg.cc/vmqJ5M73/image.png)

was also thinking of doing a (non-continuous) series of posts like, "here's what i studied last night." super quick, just a timelapse of what i did.
i think that'd be a fun idea.
besides that, i'm gonna post about distraction tomorrow. should be a fun one; a cool, general piece of advice that i think anyone that was my situation would benefit from.

it's 1:12am. i'm gonna hit the hay soon, but neetcode's itching at my brain. i wanna do more.
will add updates.

(2:09am) continuing neetcode.

i fucking hate sorting algorithms. why would anyone want to learn this shit?
before anyone cuts me off, i'm not saying that i'm not good at memorizing them. i'm saying i fucking hate them.

- Quick Sort

![quicksort](https://i.postimg.cc/D0t43YNQ/image.png)

i'm skipping Bucket Sort and moving on to his lectures on Binary Search.

coming up: **Search Array & Search Range.**

![binarysearch](https://i.postimg.cc/3rsm0dLL/image.png)

forgot to mention: finished up the week 4 prep quiz for 148, going to do the rest of the prep tomorrow.
need to start on that assignment too.
anyway, onto to the next w/ neetcode.

finished up Binary Search.

![binarysearch](https://i.postimg.cc/vmjNFV9d/image.png)

went ahead and also finished a medium problem: Search a 2D Matrix.

![search2dmatrix](https://i.postimg.cc/xT4HP3SY/image.png)

here's my soln:

![search2dmatrixsoln](https://i.postimg.cc/hvJ44xZb/image.png)

tomorrow, i'll get to Trees, Backtracking, and Heap/Priority Queue.
pretty excited to dig deep into those. backtracking's a fun one.
      `
    },
    "2025-05-24": {
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
      content: `woohoo! love it when we have three mid-tier days back-to-back-to-back. the only productive thing i did all day was record a bit on the train and do some yard work. i suppose the long weekend really took it out of me. 

got to call my girlfriend a ton today

she's sick right now but in my mind we're holding hands as she gets better. i'm not gonna slow down.

i feel like my work right now is a sacrifice to God so she feels better in the morning.

i'm gonna spend the next hour finishing up this video, then move on to leetcode/neetcode, then sleep.`
      
    },
    "2025-05-18": {
      content: `i hopped on linkedin for the first time in ages and i saw one of my boys got a new internship lined up. i'm incredibly happy for them but it made me realize i need to fucking lock in and grab one

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
          <ReactMarkdown>{selectedEntry.content}</ReactMarkdown>
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