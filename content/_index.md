---
title: "Overview"
description: "Rahul Pandey. Senior Solutions Architect at adidas, working on cloud AI and MLOps."
principles:
  - name: "Build it first"
    text: "If I can't write the loop myself, I don't understand it yet. The production library comes after that."
  - name: "Find where it breaks"
    text: "Every step of an agent can work 90% of the time while the whole run still fails. The interesting engineering lives in that gap."
  - name: "Ship and measure"
    text: "End-to-end pipelines, evaluation and monitoring, so what reaches production delivers measurable business value."
  - name: "Pass it on"
    text: "I write, make videos and mentor people starting out in data science, because explaining a system is the best test of knowing it."
topics:
  - id: "scratch"
    label: "From scratch"
    title: "AI infrastructure, from the first line"
    text: "The components everyone imports, written by hand: storage, indexing, tokenization and caching."
    tools: ["Python", "Embeddings", "Graphs", "Caching"]
    videos:
      - { id: "giFqW3Dcbog", title: "How to Build Graph Database from Scratch" }
      - { id: "4Tj6kv5-6W0", title: "Build Vector Database From Scratch" }
      - { id: "AqZSRz6Lby0", title: "Building a Tokenizer From Scratch" }
      - { id: "emZxqRScfc0", title: "Build KV Cache Layer From Scratch That Makes LLMs 20x Faster" }
  - id: "agents"
    label: "Agents"
    title: "Agents that hold up in the real world"
    text: "Memory, permissions, human approval, and the protocols that connect agents to tools and to each other."
    tools: ["LangChain", "MCP", "A2A", "Agent memory"]
    videos:
      - { id: "n3W9sySY7rs", title: "How to Build a Reliable Agents Powered by LangChain" }
      - { id: "sMMNXTmimJg", title: "Why Your AI Agent Fails: The Math You Need to Know" }
      - { id: "3x_9J25hGiA", title: "Agent memory is not \"just a vector store.\"" }
      - { id: "_1zsWFtd6hg", title: "Everyone Thinks MCP Is Just Tool Calling. It's Not only that." }
  - id: "retrieval"
    label: "RAG"
    title: "Retrieval that finds the right thing"
    text: "Why RAG pipelines fail on real documents, and how vector, graph and vectorless approaches compare under test."
    tools: ["RAG", "Vector search", "GraphRAG", "Vectorless"]
    videos:
      - { id: "E_IfcdQ_byc", title: "Your RAG Pipeline is Broken. Here's Why." }
      - { id: "jjwO3mP-NCU", title: "Building Better RAG: Vectorless Methods Put to the Test" }
  - id: "llmops"
    label: "LLMOps"
    title: "Evaluation, observability and control"
    text: "Measuring agents and skills, tracing multi-agent runs, fine-tuning, and constraining what a model can output."
    tools: ["MLflow", "Tracing", "Evaluation", "Fine-tuning"]
    videos:
      - { id: "xM4-EmLi4Fc", title: "How to evaluate and improve agent skills using MLflow" }
      - { id: "mVbQXxFJbYw", title: "No Shortcuts. Build Multi-Agent + Observability from Scratch with MLflow" }
      - { id: "3T6fdkkX3yA", title: "The One Trick AI Engineers Use to Actually Control LLM Output" }
      - { id: "jVmeNXDCUiw", title: "Karpathy's AutoResearch but it actually works for LLM fine-tuning" }
  - id: "coding"
    label: "Coding agents"
    title: "Inside the tools I build with"
    text: "How coding agents really work under the hood, and the harnesses that coordinate them."
    tools: ["Claude Code", "Harnesses", "Skills"]
    videos:
      - { id: "Zm9yvVyCP68", title: "Claude Code Isn't Magic. Here's What's Inside" }
      - { id: "Ou-EngHyjKc", title: "Omnigent: The New Meta-Harness for Every Coding Agent" }
  - id: "cloud"
    label: "Cloud ML"
    title: "The day job: ML platforms at scale"
    text: "ML pipeline design, model deployment and monitoring, and lifecycle management, on infrastructure tuned for AI workloads. Solution architecture that connects business requirements to technical implementation."
    tools: ["AWS", "Databricks", "Google Cloud", "Docker", "Kubernetes", "SQL"]
---

I am a Senior Solutions Architect at adidas, specialising in AI. I design scalable machine learning solutions that bridge business requirements with technical implementation, drawing on years of work in data analytics and simulation.

My focus is end-to-end ML pipelines, cloud infrastructure tuned for AI workloads, and making sure what we ship delivers measurable business value. Outside work I mentor people starting out in data science, and I build AI systems from scratch on [YouTube](/youtube/).
