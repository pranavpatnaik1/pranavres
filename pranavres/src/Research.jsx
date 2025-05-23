import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ReactMarkdown from 'react-markdown';

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

- fastAI
- cs231 & cs224 from stanford

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
      {selectedEntry ? (
        <div className="selected-entry">
          <h2>{formatDisplayDate(parseDateString(selectedEntry.date))}</h2>
          <ReactMarkdown>{selectedEntry.content}</ReactMarkdown>
        </div>
      ) : (
        <div className="no-entry">
          <h2>{formatDisplayDate(parseDateString(selectedDate))}</h2>
          <p className="empty-message">No entry for this date.</p>
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