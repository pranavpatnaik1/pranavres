import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

export default function Writing() {
  // Sample writing entries with titles, subtitles, and banner images
  const writingEntries = {
    "the-art-of-procrastination": {
      title: "the art of procrastination",
      subtitle: "Why putting things off might be the key to creativity",
      banner: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
      date: "2024-12-15",
      content: `# the art of procrastination

*Why putting things off might be the key to creativity*

We've all been there. The deadline looms, the task sits undone, and yet we find ourselves doing literally anything else. Cleaning our room, reorganizing our bookshelf, or diving deep into Wikipedia rabbit holes about obscure historical events.

But what if I told you that procrastination isn't always the enemy we make it out to be?

## The Creative Pause

There's something magical that happens in the space between intention and action. When we procrastinate, our minds don't actually stop working on the problem. Instead, they work on it differently.

> "The best ideas come when you're not trying to have them." - Someone wise, probably

## The Science Behind the Delay

Research shows that moderate procrastination can actually boost creativity. When we delay starting a task, our subconscious mind continues to process information, making unexpected connections.

This isn't an excuse to put everything off indefinitely, but rather an acknowledgment that sometimes the best work comes from giving ideas time to marinate.

## Finding the Balance

The key is distinguishing between productive procrastination and avoidance. One leads to better ideas; the other leads to stress and missed opportunities.

So the next time you find yourself putting something off, ask: *Am I avoiding this, or am I letting it simmer?*

Sometimes the answer might surprise you.`
    },
    "digital-minimalism": {
      title: "Digital Minimalism",
      subtitle: "Reclaiming attention in an age of distraction",
      banner: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=400&fit=crop",
      date: "2024-12-10",
      content: `# Digital Minimalism

*Reclaiming attention in an age of distraction*

Our phones buzz. Notifications ping. The red badge counts climb higher. We live in an attention economy where our focus is the product being sold.

But what if we chose differently?

## The Cost of Constant Connection

Every notification is a small interruption, a tiny fracture in our concentration. These micro-breaks add up, leaving us feeling scattered and unfocused.

The average person checks their phone 96 times per day. That's once every 10 minutes during waking hours.

## The Minimalist Approach

Digital minimalism isn't about rejecting technology entirely. It's about being intentional with our digital tools, using them to support our values rather than letting them dictate our behavior.

### Practical Steps:

1. **Audit your apps** - Which ones truly add value to your life?
2. **Create phone-free zones** - Meals, bedrooms, first hour of the day
3. **Batch notifications** - Check messages at set times rather than constantly
4. **Embrace boredom** - Let your mind wander without immediately reaching for stimulation

## The Paradox of Choice

With infinite content at our fingertips, we often end up consuming nothing meaningful. By constraining our options, we can focus on what truly matters.

Quality over quantity. Depth over breadth. Intention over impulse.

The goal isn't to live like a monk, but to live like someone who values their attention as the precious resource it is.`
    },
    "learning-in-public": {
      title: "Learning in Public",
      subtitle: "The vulnerability and power of sharing your journey",
      banner: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop",
      date: "2024-12-05",
      content: `# Learning in Public

*The vulnerability and power of sharing your journey*

There's something terrifying about showing your work before it's perfect. About admitting you don't know something. About being wrong in front of others.

And yet, learning in public might be one of the most powerful things you can do.

## The Fear of Being Wrong

We're conditioned to hide our ignorance, to only speak when we're certain, to present polished final products rather than messy work-in-progress.

But this approach has a cost: it slows down our learning and isolates us from the very community that could help us grow.

## The Benefits of Transparency

When you learn in public, several things happen:

- **You get feedback faster** - Others can correct your mistakes before they become habits
- **You build a network** - People who share your interests find you
- **You help others** - Your questions often mirror what others are wondering
- **You create accountability** - Public commitment increases follow-through

## Starting Small

You don't need to write a blog or start a YouTube channel. Learning in public can be as simple as:

- Sharing what you learned today on social media
- Asking questions in online communities
- Writing brief summaries of articles you read
- Explaining concepts to friends (even if you're still figuring them out)

## The Compound Effect

Each small act of learning in public builds on the last. Your questions get better. Your explanations become clearer. Your network grows.

Most importantly, you develop comfort with not knowing everything. And in a world that changes as fast as ours, that comfort with uncertainty might be the most valuable skill of all.

The best time to start learning in public was yesterday. The second best time is now.`
    }
  };

  const navigate = useNavigate();

  // Get all articles for the grid view
  const getAllArticles = () => {
    return Object.entries(writingEntries)
      .map(([slug, article]) => ({
        slug,
        ...article
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  function ArticleList() {
    const articles = getAllArticles();
    
    return (
      <div className="writing-page">
        <div className="writing-header">
          <h1>writing</h1>
          <p>essays, research, breakdowns</p>
        </div>
        
        <div className="articles-grid">
          {articles.map((article) => (
            <div 
              key={article.slug}
              className="article-card"
              onClick={() => navigate(`/writing/${article.slug}`)}
            >
              <div className="article-card-content">
                <h2>{article.title}</h2>
                <p className="article-subtitle">{article.subtitle}</p>
                <span className="article-date">{new Date(article.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="article-card-thumbnail">
                <img src={article.banner} alt={article.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Article() {
    const { slug } = useParams();
    const article = writingEntries[slug];
    const navigate = useNavigate();
    
    if (!article) {
      return <Navigate to="/writing" />;
    }

    return (
      <div className="article-page">
        <div className="article-banner">
          <img src={article.banner} alt={article.title} />
          <div className="article-banner-overlay">
            <h1>{article.title}</h1>
            <p>{article.subtitle}</p>
            <span className="article-date">
              {new Date(article.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
        
        <div className="article-content">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/:slug" element={<Article />} />
    </Routes>
  );
} 