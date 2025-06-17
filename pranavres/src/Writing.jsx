import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import ArticleComments from './components/ArticleComments';

export default function Writing() {
  // Sample writing entries with titles, subtitles, and banner images
  const writingEntries = {
    "embeddings": {
      title: "embeddings",
      subtitle: "a quick breakdown on how ML models understand the world",
      banner: "https://i.postimg.cc/1zYsR30v/image.png",
      date: "2025-06-09",
      content: `# explaining embeddings

in machine learning, almost everything starts with a simple question:  
**how do we represent something in a way the model can actually use?**

you can't feed raw text, pixels, or audio directly into a neural network and expect anything useful. you need to turn it into **numbers** first -- and not just any numbers, but numbers that *mean something*.

that's what **embeddings** are for.

> embeddings are vector representations of data -- designed so that geometry reflects meaning. similar things sit close together. different things drift apart.

let's walk through what that means, why it works, and how we actually build these things.

## 1. from symbols to space

take the word "cat". how do you represent it?

you could just assign it an ID. like "cat" = 17. but then "cat", "dog", and "lion" might be 17, 1032, and 76 -- with no actual relationship between them.

what we want is something more like this:

![embeddings](https://i.postimg.cc/DZVn3vX9/image.png)


so that **"cat" and "dog" are close**, but "car" is off doing its own thing.

this isn't just for words either. anything can be embedded -- images, audio, sentences, video, documents, code.

the point is to map arbitrary inputs into a vector space where **semantic distance becomes actual distance**.

## 2. the early years: word2vec and friends

the first big breakthrough came from [Mikolov et al., 2013](https://arxiv.org/abs/1301.3781) with **word2vec**. they realized: you can learn word meanings just by looking at **what words show up nearby**.

they trained a model on billions of words, optimizing the objective:

> words that occur in similar contexts should have similar embeddings

this worked surprisingly well. classic examples:

![embeddings](https://i.postimg.cc/Pqj6bRvk/image.png)


these embeddings were static -- "bank" always had the same vector, whether you meant riverbank or finance. but they were fast to compute and great for downstream tasks like similarity search or topic clustering.

[GloVe](https://aclanthology.org/D14-1162/) (Pennington et al., 2014) improved on this by incorporating global co-occurrence statistics instead of just local windows.

## 3. transformers changed the game

fast forward to 2018. models like **ELMo** ([Peters et al.](https://aclanthology.org/N18-1202/)) and **BERT** ([Devlin et al.](https://arxiv.org/abs/1810.04805)) brought us **contextual embeddings**.

instead of giving each word one fixed vector, they generated vectors **based on the sentence**.

example:

- "he sat by the river bank" → embedding for "bank" points to nature
- "he went to the bank to deposit cash" → embedding for "bank" points to finance

this is huge -- because meaning isn't static. it depends on context.

transformers handle this by running attention over the whole sequence and updating token representations based on surrounding words. the output is a dense, high-dimensional embedding for every token, shaped by context.

## 4. sentence and document embeddings

okay, so word embeddings are great. but what about full sentences or paragraphs?

there are a few common tricks:

- use the '[CLS]' token (like in BERT)
- average the token embeddings (aka mean pooling)
- apply some trainable pooling layer

a lot of models are built for this directly:

- **Sentence-BERT** ([Reimers & Gurevych, 2019](https://arxiv.org/abs/1908.10084)) fine-tuned BERT with contrastive loss for sentence similarity
- **Universal Sentence Encoder** from Google optimized for semantic tasks like STS and clustering
- **OpenAI's text-embedding-ada-002** is trained to place semantically similar text near each other at scale

these embeddings get used for:

- search (retrieval-based systems)
- deduplication / clustering
- recommendations
- vector databases like pinecone, weaviate, chroma, qdrant

## 5. multimodal embeddings

what if you want to embed **images and text into the same space**?

enter **CLIP** ([Radford et al., 2021](https://arxiv.org/abs/2103.00020)).

CLIP trains two encoders -- one for images, one for text -- and optimizes them so that matching pairs end up close together in the shared space.

so "a photo of a cat" and the actual photo both map to roughly the same vector.

this lets you do zero-shot classification, image search, and more -- all by comparing vectors.

other examples:

- **DINOv2**: powerful image embeddings
- **Whisper**: audio embeddings
- **openai's embeddings**: universal across tasks like summarization, Q&A, semantic retrieval

## 6. what makes an embedding *good*?

good embeddings should:

- capture **semantic meaning**
- be **smooth** -- small changes in input give small changes in vector
- be **clusterable** and **searchable**
- generalize across tasks

and importantly: they should **transfer**. a good embedding can power search, classification, retrieval, summarization -- all from the same model.

you can visualize them with t-SNE or UMAP, but the real test is whether they're useful in production.

## 7. math break (light edition)

say you have two vectors, 'A' and 'B'.

how do you measure similarity?

most common: **cosine similarity**

![cosine similarity](https://i.postimg.cc/ZRKzHRvZ/image.png)

this gives 1 for perfect match, 0 for orthogonal (unrelated), -1 for total opposites.

you can also use euclidean distance if you care more about magnitude.

## tldr

embeddings are how models turn messy real-world input into structured, meaningful geometry.

- they're the first step in most AI pipelines
- they encode similarity as distance
- they power everything from search engines to multimodal AI

and if you're building something that needs to understand or compare data -- you're probably going to need them.
`
    },
    "transformers": {
      title: "transformers",
      subtitle: "quick breakdown on ML's most disruptive concept",
      banner: "https://i.postimg.cc/dtySftS8/image.png",
      date: "2025-06-09",
      content: `# quickbreakdown on ML's most disruptive concept

in 2017, google dropped a paper called *"attention is all you need."* they were right. that one idea--attention-- ended up flipping the whole field of ai on its head.

if you've heard of gpt, chatgpt, bard, gemini, llama, mistral, claude -- whatever -- they're all built on **transformers**.

but what even *is* a transformer? and why did everyone ditch the old stuff for it?

let's break it down.

## how we used to do it

before transformers, we had RNNs (recurrent neural networks) and CNNs (convolutional neural networks). here's the issue with both:

- **RNNs** read text one word at a time, like a typewriter. sounds nice, but it's *slow*, and they forget things quickly. even with LSTMs and GRUs (which are like memory-boosted RNNs), they struggled with long sentences.
- **CNNs** were faster but kinda dumb for language. they're great for images, not for understanding how words relate across a sentence.

so yeah, they worked, but they were clunky.

## the idea that changed everything

transformers said: **what if we just let every word look at every other word?**

that's it.

instead of processing words one-by-one, the transformer looks at the whole sentence at once and decides what matters.

take this sentence:

> "the animal didn't cross the road because it was too tired."

what does *"it"* refer to? the animal. a transformer learns that by letting "it" pay attention to "animal."

this whole attention thing is called **self-attention**, and it's the beating heart of the transformer.

## how it works (without too much math)

okay so here's the basic setup:

- you feed in a sentence like: '["the", "cat", "sat", "on", "the", "mat"]'
- each word gets turned into a vector — a list of numbers that kind of captures its meaning.
- now each word sends out three signals:
  - a **query** (what am i looking for?)
  - a **key** (what do i offer?)
  - a **value** (what info do i carry?)

each word matches its query to everyone else's key — to figure out who's relevant — and pulls in info from their values.

the result? every word builds a custom context-aware version of itself.

## heads, stacks, layers

transformers don't do attention just once. they do it in **multiple heads** — like having different perspectives looking at the sentence in parallel. one head might focus on grammar, another on meaning, another on position.

then you **stack** a bunch of those layers on top of each other — and you get a deep model that actually "gets" language.

at the end, you might have a head that realizes:

- "it" = "animal"
- "cross" is an action
- "too tired" explains the action

and it's all learned just from data.

## encoder vs decoder

the original transformer had two halves:

- the **encoder** reads the input (like a sentence you want to translate)
- the **decoder** writes the output (like the translation)

but different models use different parts:

- **BERT** only uses the encoder — it's built to understand things
- **GPT** only uses the decoder — it's built to generate things

## why it crushed everything

so why did transformers take over?

1. **no more step-by-step reading**  
   they process text *in parallel*, which means way faster training.

2. **better memory**  
   attention lets the model remember stuff from anywhere in the sentence, not just the last few words.

3. **scales like crazy**  
   you can keep stacking layers and making the model bigger — and it just keeps getting better.

that's how we went from tiny models doing sentiment analysis to GPT-4 writing essays and coding websites.

## but it's not just text

the crazy part? transformers now run **everything**:

- **images** (like vision transformers, aka ViT)
- **audio** (like whisper)
- **code**
- **robotics**
- **video**
- even **protein folding** (alphafold)

it's not just a language model trick. it's become the blueprint for modern AI.

## so what should you remember?

if you wanna sound smart at a party or just get the vibe:

- a **transformer** is a model that learns what to pay attention to.
- it looks at **all** the input at once and decides which parts matter.
- this makes it better, faster, and more scalable than the old-school models.
- and it's the reason chatgpt and friends exist.

that's it. attention really *was* all we needed.
`
    },
    "diffusion-models": {
      title: "diffusion models",
      subtitle: "breakdown on the most powerful generative models",
      banner: "https://i.postimg.cc/BQBw3w46/image.png",
      date: "2025-06-09",
      content: `# diffusion models

a little while ago i made a [reel](https://www.instagram.com/reel/DKKcA9jsMVU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==) on diffusion models. this article's for a deeper dive on the topic.

## how do you get a model to generate something from scratch?

that's the problem diffusion models try to solve. whether it's a picture, a sound, or a 3d object -- the question is the same:

> how do you get a machine to *create* something, starting from nothing?

the answer? you don't start from nothing. you start from **noise**.

## the big idea

imagine taking a photo and slowly adding random noise to it. like, frame by frame, turning it into static. eventually, all the detail is gone -- it's just fuzz.

now flip the process.

what if you trained a model to *reverse* that? to start with static and gradually recover the original image?

that's what a diffusion model does.

## the forward process (aka wrecking the image)

you start with a dataset of clean images. then, for each one, you apply noise in multiple steps. not all at once -- slowly, over like 1000 timesteps.

mathematically, this is called a **markov chain** -- each step depends only on the one before it.

here's the idea:

![idea](https://i.postimg.cc/mrbKYxBx/image.png)

at each step 't', you add some noise to get 'xₜ' from 'xₜ₋₁'.

the noise is usually gaussian, and the amount added is controlled by a small value 'βₜ'.

after enough steps, the image becomes indistinguishable from random static.

## the reverse process (aka creation)

now comes the fun part: reversing the mess.

you train a model to take a noisy image at step 't' and predict a *less noisy* version from step 't-1'.

you don't do this all in one go -- the model just learns to take one small step back. then you do it repeatedly.

if it gets good at this, you can start with pure noise and walk it back into a full, clean image.

## what is the model actually predicting?

originally, people had the model predict the denoised image directly.

but a better approach turned out to be predicting the **noise** that was added at each step.

so instead of guessing what the image looked like, the model learns to guess what noise got mixed in.

if it can do that, you just subtract the noise from the noisy input, and boom -- you've moved one step backward.

this trick shows up in models like **DDPM** (denoising diffusion probabilistic models) and helps make training more stable and efficient.

## where you've seen this before

you've 100% seen diffusion models in action:

- **dalle 2** and **stable diffusion** generate images from text using this exact method
- **whisper** for audio, **gen-2** for video, and even some 3d generation tools use diffusion now
- people are even applying it to proteins and molecules

anything generative -- diffusion might be behind the curtain

## pros and cons

**pros:**

- generates really high-quality stuff
- super flexible -- you can condition on anything: text, audio, another image
- more stable training than GANs

**cons:**

- slow. it needs lots of steps to denoise from pure noise
- less efficient than transformers unless you tweak things

people are working on this though -- with stuff like **latent diffusion** (which works in compressed space) and **consistency models** (which try to cut down the number of steps)

## tldr

diffusion models work by:

1. taking clean data and slowly corrupting it into noise
2. training a model to undo that process step-by-step
3. sampling new data by running the reverse process from pure noise

it's slow, but incredibly powerful. and it's why the stuff AI makes today looks so damn good.

next time someone says "this came from nothing," you'll know -- it actually came from noise.
`
    },
    "vector-search": {
      title: "vector search",
      subtitle: "how to use embeddings for search",
      banner: "https://i.postimg.cc/NGCw59k6/image.png",
      date: "2025-06-09",
      content: `# how to use embeddings for search

you've got embeddings. maybe you're using openai's 'text-embedding-ada-002', maybe you trained your own.  

great -- now what?

you want to find things that are *similar*. fast. at scale.

that's what **vector search** is for.

> instead of searching by keywords, you search by meaning. using vectors. and math.

## why not just use traditional search?

classic search (like TF-IDF or BM25) looks for **exact words** in your query and ranks documents that match.

this works for narrow cases. but what if someone searches:

> "how do i fix a bike chain"

and your database has:

> "repairing a broken bicycle gear system"

those are the same idea -- but no keyword overlap. keyword search won't get you there.

**vector search will** -- because embeddings place both in the same region of vector space.

## how it works

step by step:

1. you embed all your data (text, images, etc.) into vectors  
2. you embed the user's query into a vector  
3. you find the nearest vectors to the query  
4. return the matches

you're not matching strings -- you're matching **locations in space**

## similarity metrics

most common metric is **cosine similarity**:

![cosine similarity](https://i.postimg.cc/ZRKzHRvZ/image.png)

remember, 
this gives 1 for perfect match, 0 for unrelated, -1 for opposites.

some systems use **euclidean distance** or **dot product** depending on the use case and embedding scale.

## scaling it up

you've got 10 million documents? you can't compute cosine similarity on all of them every time.

you need **approximate nearest neighbors (ANN)**.

ANN libraries trade *a bit* of accuracy for *a lot* of speed. they build data structures that let you search fast, like:

- **FAISS** (Facebook AI Similarity Search)
- **ScaNN** (Google)
- **Annoy** (Spotify)
- **HNSWlib** (Hierarchical Navigable Small World graphs)

these support indexing, compression, and GPU acceleration when needed.

## vector databases

wrapping all this up are purpose-built vector databases. they store your embeddings, handle indexing, and expose simple APIs.

popular ones:

- **Pinecone**  
- **Weaviate**  
- **Qdrant**  
- **Chroma**  
- **Milvus**

they often support filtering, metadata, hybrid search (vector + keyword), and real-time updates.

## hybrid search = best of both

you don't always want to throw away keywords. hybrid search combines vector similarity with traditional ranking.

example:  
search for "red shoes" -> filter by color = "red" and rank by embedding similarity

most modern systems (like You.com, Neeva, or Perplexity) use hybrid under the hood.

## when to use vector search

vector search makes sense when:

- you're working with **semantic content** (natural language, images, audio)
- you want **flexible querying** (e.g. "things like this")
- you're doing **recommendations**, **retrieval-augmented generation**, or **search UIs**

don't use it if you just need strict filters or structured queries (e.g. SQL joins).

## use case: retrieval-augmented generation (RAG)

in RAG pipelines, you grab relevant documents via vector search and feed them into a language model.

for example:  

user asks "what's your return policy?"  
-> embed the query  
-> search your docs for relevant sections  
-> feed those into GPT for a well-informed answer

this is how tools like ChatGPT + web, Perplexity, and custom GPTs stay grounded.

## tldr

vector search flips search on its head — you don't match exact text, you match **meaning**.

- powered by embeddings
- accelerated by ANN algorithms
- made easy by vector databases
- essential for semantic search, RAG, and modern AI interfaces

if you want to build smarter search — vector is the way.
`},
    "rag": {
      title: "retrieval-augmented generation",
      subtitle: "breakdown on retrieval-augmented generation",
      banner: "https://i.postimg.cc/nhjm6D00/image.png",
      date: "2025-06-09",
      content: `# breakdown on retrieval-augmented generation

# retrieval-augmented generation (RAG), explained like you're shipping it

large language models are good at a lot of things. but they suck at remembering stuff that happened outside their training data.

they don't know what's in *your* docs. they hallucinate. and they cut off at some snapshot in the past.

RAG fixes that.

> retrieval-augmented generation = give the model context from an external knowledge base right before it answers.

this way, you get responses grounded in real info — not just the model's memory.

## how it works (step-by-step)

1. **embed the user query**
   - turn the question into a vector using the same embedding model you used for your docs

2. **search your database**
   - use vector search (see previous article) to pull the most relevant docs
   - usually 3–10 chunks

3. **stuff or chain the context**
   - either shove those chunks directly into the prompt (naive RAG)
   - or chain them intelligently with a reranker, summarizer, or multi-step planner

4. **generate the final answer**
   - pass the retrieved context + user query into a language model (openai, anthropic, mistral, llama, whatever)
   - the model answers using the given context

if done right, the LLM acts like it "knows" your data — but it's actually reading it in real time.

## why it works

language models are excellent at pattern completion. if you give them the right ingredients, they can generate a high-quality output.

RAG essentially **injects facts** into the prompt that the model wouldn't know otherwise.

this:

> "what's our refund policy?"

...is vague. the model will make something up.

but this:

> "you said: refunds must be requested within 30 days of delivery. question: what's our refund policy?"

...grounds the answer in real stuff.

## what's actually happening under the hood?

at a high level:

- you use **text embeddings** (like OpenAI's 'text-embedding-ada-002') to embed all your documents
- you use a **vector database** (pinecone, chroma, weaviate) to store and search them
- you use a **language model** to stitch it all together at query time

it's retrieval + generation, piped together.

some people get fancy and add re-rankers (e.g. 'bge-reranker', 'colbert'), summarizers, or filters. others just use straight-up cosine similarity and let GPT handle the rest.

## when to use RAG

RAG is a good fit when:

- your data changes often
- you need *up-to-date* answers
- you want to give LLMs access to custom knowledge (docs, internal tools, transcripts, etc.)
- you don't want to fine-tune a model

examples:

- internal company chatbots
- customer support agents
- academic search tools
- legal / policy document QA
- ai that reads your personal notes

## how it compares to fine-tuning

![rag vs fine-tuning](https://i.postimg.cc/dQb4HJsM/image.png)

in most practical cases, RAG is the better first move.

## tools and stacks

common setup:

- **embedding model**: 'text-embedding-ada-002', 'bge', 'sentence-transformers'
- **vector db**: 'pinecone', 'weaviate', 'qdrant', 'chroma'
- **language model**: 'gpt-4', 'claude', 'llama', 'mistral'
- **RAG orchestration**: 'langchain', 'llamaindex', or your own glue code

you can host it yourself or go through platforms like 'supabase', 'valyr', 'dust', 'flowise', etc.

## things to watch for

- **bad chunking** = useless retrieval. use semantic chunks, not random splits.
- **irrelevant docs** = garbage outputs. rerank or filter aggressively.
- **context length limits** = don't overload the model. find balance.
- **trust** = just because it's in the prompt doesn't mean the model will always use it. add strong instructions.

## tldr

retrieval-augmented generation is how you make LLMs actually useful for real-world, dynamic, personalized tasks.

- it combines search + generation
- it keeps your answers grounded and updated
- it's flexible, production-friendly, and easy to tune

if you're building anything with an LLM and a data source -- you're probably gonna want to use RAG.
`},
    "contrastive-learning": {
      title: "contrastive learning",
      subtitle: "explained like you're a 5 y/o",
      banner: "https://i.postimg.cc/vTdK9SHZ/triplet-loss.png",
      date: "2025-06-14",
      content: `

a lot of modern models aren't trained to classify or generate — they're trained to **compare**.

that's the core idea of contrastive learning:

> bring similar things closer, push different things apart.

it's how models learn really useful embeddings — especially for search, retrieval, and matching tasks. if you've worked with CLIP, sentence-transformers, DINOv2, or anything involving semantic similarity, contrastive learning is probably under the hood.

## what is contrastive learning?

instead of telling a model "this is a cat" or "this is a dog", you show it **pairs**:

- ("a cat sitting on a couch", image of a cat on a couch)
- ("a dog in a park", image of a dog in a park)

you pass both sides through encoders:

- a text encoder
- an image encoder

and you teach the model:

- matching pairs should be **close together** in embedding space
- non-matching pairs should be **far apart**

no class labels. no supervision beyond which things go together.

## how does the model learn that?

with a loss function designed to reshape the space.

### 1. contrastive loss (basic form)

used in SimCLR and similar setups. for a given anchor $a$ and positive $b$:

$$
L = -\\log\\left(\\frac{\\exp(\\text{sim}(a, b))}{\\sum_j \\exp(\\text{sim}(a, j))}\\right)
$$

this means: make $a$ close to $b$, and far from every other $j$ in the batch.

the similarity function is usually cosine similarity:

$$
\\text{sim}(x, y) = \\frac{x \\cdot y}{\\|x\\| \\cdot \\|y\\|}
$$

### 2. triplet loss

triplet loss compares three examples:

- anchor
- positive (same concept)
- negative (different concept)

you want:

$$
\\text{distance}(a, p) + \\text{margin} < \\text{distance}(a, n)
$$

or more formally:

$$
L = \\max(0, \\text{distance}(a, p) - \\text{distance}(a, n) + \\text{margin})
$$

this forces the model to separate the positive from the negative by at least some margin. used in face verification (FaceNet) and metric learning.

### 3. InfoNCE

used in CLIP, SimCLR, and others. this is a temperature-scaled version of contrastive loss that improves training dynamics.

$$
L = -\\log\\left(\\frac{\\exp(\\text{sim}(a, b) / \\tau)}{\\sum_j \\exp(\\text{sim}(a, j) / \\tau)}\\right)
$$

where $\\tau$ is the temperature hyperparameter.

## why is this useful?

contrastive learning is **self-supervised** — meaning no labeled classes required.

the labels come from relationships in the data:

- this text matches that image
- this crop is a different view of the same photo
- this sentence paraphrases that one

the model learns to structure its embedding space around meaning instead of memorized categories.

## where it shows up

contrastive learning powers a ton of modern systems:

- **sentence embeddings**: Sentence-BERT, GTR, bge — all trained with contrastive or triplet loss
- **vision**: SimCLR, DINOv2, MoCo use self-supervised contrastive learning
- **multimodal**: CLIP learns shared embedding space across images and text
- **retrieval**: DPR uses QA pairs and contrastive objectives to train dense retrieval models

the result is an embedding space where semantic distance = vector distance.

## implementation basics

to build a contrastive system, you need:

- **paired data**: things that should be similar (text↔text, image↔text, etc.)
- **encoders**: like transformers for text or convnets/VITs for images
- **a similarity metric**: typically cosine similarity
- **a loss function**: contrastive loss, InfoNCE, or triplet loss

and ideally:

- large batch sizes (more negatives = better contrastive signal)
- normalized embeddings (L2 norm)
- temperature scaling to smooth gradients

## tldr

contrastive learning teaches models to compare, not just classify.

- pull similar examples close
- push different ones apart
- train without explicit labels

it's the core of how we get meaningful embeddings for search, retrieval, and matching. and if you're working with vector similarity, there's a good chance contrastive learning got you there.`
    },
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    React.useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
      <div className="writing-page">
        <div className="writing-header">
          <h1>essays</h1>
          <p>writing, research, breakdowns</p>
        </div>
        
        <div className="articles-grid">
          {articles.map((article) => (
            <div 
              key={article.slug}
              className="article-card"
              onClick={() => navigate(`/essays/${article.slug}`)}
              style={{ cursor: 'pointer' }}
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
              {!isMobile && (
                <div className="article-card-thumbnail">
                  <img src={article.banner} alt={article.title} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Article() {
    const { slug } = useParams();
    const article = writingEntries[slug];
    
    if (!article) {
      return <Navigate to="/essays" />;
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
          <ReactMarkdown 
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            remarkPlugins={[remarkMath]}
          >
            {article.content}
          </ReactMarkdown>
        </div>
        
        <ArticleComments articleSlug={slug} />
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