---
title: "Less is More: Recursive Reasoning with Tiny Networks"
date: 2025-10-11T16:00:00Z
draft: false
summary: "A comprehensive summary of the paper."
tags: ["trm", "Tiny Recursive Model", "small-sample learning", "recursive reasoning", "AI"]

---
# Less is More: Recursive Reasoning with Tiny Networks
**Paper Link:** https://arxiv.org/html/2510.04871v1

## Key Concepts

Tiny Recursive Model • TRM • Hierarchical Reasoning Model • HRM • recursive reasoning • deep supervision • fixed-point theorem • Sudoku-Extreme • ARC-AGI • Chain-of-thoughts • CoT • Test-Time Compute • TTC • adaptive computational time • ACT • exponential moving average • EMA • self-attention • latent features • overfitting • generalization • parameter efficiency • small-sample learning • data augmentation • Implicit Function Theorem • IFT

---

## What's This Paper About?

This paper introduces Tiny Recursive Model (TRM), a simplified approach to solving hard puzzle problems using very small neural networks. The researchers were trying to improve upon an existing method called Hierarchical Reasoning Model (HRM), which uses two small networks working at different speeds to solve complex puzzles. While HRM showed promise by beating much larger language models on tasks like Sudoku and maze-solving, it was complicated and relied on uncertain biological theories and mathematical theorems. TRM simplifies this approach dramatically by using just one tiny network with only 2 layers instead of two 4-layer networks. The key innovation is that TRM recursively improves its answers by repeatedly processing the question, current answer, and reasoning state through the same small network multiple times. With only 7 million parameters (compared to billions in large language models), TRM achieves 45% accuracy on ARC-AGI-1 and 8% on ARC-AGI-2, outperforming most large language models while using less than 0.01% of their parameters. The researchers tested their approach on extremely difficult puzzles including Sudoku, maze navigation, and geometric reasoning tasks, showing significant improvements over the original HRM method.

*Source: Abstract and Introduction sections*

---

## Main Findings

### 1. Finding

TRM significantly outperforms HRM on all tested benchmarks while using fewer parameters. On Sudoku-Extreme, TRM achieves 87% test accuracy compared to HRM's 55%, using only 5-7 million parameters versus HRM's 27 million parameters.

*Source: Results section, Tables 4 and 5*

### 2. Finding

TRM outperforms large language models on puzzle tasks despite being dramatically smaller. With 7M parameters, TRM obtains 45% accuracy on ARC-AGI-1 and 8% on ARC-AGI-2, higher than Deepseek R1 (671B parameters), o3-mini-high, and Gemini 2.5 Pro (32K parameters).

*Source: Abstract and Tables 4-5 in Results section*

### 3. Finding

Removing the need for fixed-point theorem assumptions dramatically improves performance. By backpropagating through the full recursion process instead of using a 1-step gradient approximation, TRM improved from 56.5% to 87.4% accuracy on Sudoku-Extreme.

*Source: Section 4.1 and Table 1 ablation study*

### 4. Finding

Using a single tiny network instead of two separate networks improves generalization while reducing parameters. The single network approach improved accuracy from 82.4% to 87.4% on Sudoku-Extreme while halving the parameter count.

*Source: Section 4.3 and Table 1 ablation study*

### 5. Finding

Smaller networks with more recursions perform better than larger networks with fewer recursions. Using 2 layers instead of 4 layers improved performance from 79.5% to 87.4% on Sudoku-Extreme while reducing parameters by half.

*Source: Section 4.4 and Table 1 ablation study*

### 6. Finding

Deep supervision is the primary driver of performance gains in recursive reasoning models. An independent analysis showed that deep supervision doubled accuracy from 19% to 39%, while recursive hierarchical reasoning only provided incremental improvements from 35.7% to 39.0%.

*Source: Section 2, page 2*

### 7. Finding

For tasks with small fixed context lengths, replacing self-attention with multilayer perceptrons improves performance. On Sudoku 9x9 grids, using MLP instead of self-attention improved accuracy from 74.7% to 87.4%.

*Source: Section 4.5 and Table 1 ablation study*

### 8. Finding

The optimal number of latent features is exactly two: a current solution (y) and a reasoning state (z). Using more features decreased performance to 77.6%, and using only one feature decreased performance to 71.9%.

*Source: Section 4.2 and Table 2*

### 9. Finding

Exponential Moving Average (EMA) of weights prevents overfitting and improves stability on small datasets. Adding EMA improved performance from 79.9% to 87.4% on Sudoku-Extreme.

*Source: Section 4.7 and Table 1 ablation study*

### 10. Finding

Heavy data augmentation is crucial for generalization on small datasets. Sudoku-Extreme uses 1000 shuffling augmentations per example, Maze-Hard uses 8 dihedral transformations, and ARC-AGI uses 1000 augmentations including color permutation and geometric transformations.

*Source: Section 5, Results section*

---

## Graphs & Figures Explained

### Figure 1 - TRM Architecture Diagram

This diagram shows how TRM works by taking an input question, initial answer, and reasoning state, then recursively improving the answer through up to 16 improvement steps. Each step involves updating the reasoning state multiple times, then updating the answer based on the current reasoning.

**Key Takeaway:** TRM uses a simple recursive process to progressively improve answers while being extremely parameter-efficient

*Source: Figure 1 on page 1*

### Table 1 - Ablation Study Results

This table compares different versions of TRM against HRM on Sudoku-Extreme, showing how each design choice affects performance. It demonstrates that TRM achieves 87.4% accuracy versus HRM's 55% while using fewer parameters and forward passes.

**Key Takeaway:** Every simplification in TRM improves performance while reducing computational requirements

*Source: Table 1 in Section 4*

### Tables 4 and 5 - Benchmark Comparisons

These tables compare TRM against large language models and HRM across multiple puzzle benchmarks including Sudoku-Extreme, Maze-Hard, ARC-AGI-1, and ARC-AGI-2. They show TRM consistently outperforming much larger models.

**Key Takeaway:** Small recursive models can outperform massive language models on reasoning tasks

*Source: Tables 4 and 5 in Results section*

### Figure 6 - Sudoku Example Visualization

This figure shows a concrete example of how TRM processes a Sudoku puzzle, displaying the input, expected output, and the internal representations of the solution (y) and reasoning state (z). It demonstrates that y corresponds to the predicted solution while z contains abstract reasoning information.

**Key Takeaway:** The two latent features serve distinct purposes: one for the current solution and one for reasoning

*Source: Figure 6 on page 12*

---

## Complex Concepts Explained

### Recursive Reasoning

Imagine you're solving a really hard puzzle, like a jigsaw puzzle with thousands of pieces. Instead of trying to solve it all at once, you look at it, make your best guess about where a few pieces go, then look at it again with this new information to make better guesses. You keep doing this over and over, each time making your solution a little bit better. That's what recursive reasoning does - it takes a problem, makes a guess, then uses that guess to make a better guess, repeating this process many times until it gets the right answer. It's like having a conversation with yourself where each time you speak, you get smarter about the problem.

*Source: Section 1 Introduction and Section 4*

### Deep Supervision

Think of deep supervision like having multiple checkpoints in a video game. Instead of only getting feedback when you complete the entire level, you get hints and corrections at each checkpoint along the way. In TRM, instead of only learning from the final answer, the model gets to practice and learn from up to 16 different attempts at solving the same problem. Each attempt uses what it learned from the previous attempt as a starting point, like building a tower where each block helps you reach higher. This helps the model learn much faster and avoid getting stuck in wrong patterns of thinking.

*Source: Section 2.4 and throughout the methodology*

### Fixed-Point Theorem and 1-Step Gradient Approximation

Imagine you're bouncing a ball and trying to predict where it will eventually stop bouncing and stay still - that's the 'fixed point.' The original HRM method assumed that after bouncing the ball a few times, you could predict where it would stop just by looking at the last bounce. This is like trying to predict the end of a movie by only watching the last few minutes. TRM realized this assumption was often wrong and instead watches the whole process from start to finish, which gives much better understanding of what's actually happening. It's like watching the entire movie instead of just the ending to understand the story.

*Source: Section 3.1 and Section 4.1*

### Adaptive Computational Time (ACT)

ACT is like having a smart timer that knows when you've spent enough time on a homework problem. Instead of always spending the same amount of time on every problem (like always spending exactly 10 minutes per math problem), ACT learns to recognize when you've figured out an easy problem quickly and can move on, versus when you need more time for a hard problem. For the computer, this means it doesn't waste time continuing to work on problems it has already solved correctly, and can instead focus its energy on learning from new problems. It's like a teacher who knows when to say 'good job, move to the next question' versus 'keep working on this one.'

*Source: Section 2.5 and Section 4.6*

### Parameter Efficiency

Think of parameters like the number of tools in a toolbox. Large language models are like having a massive warehouse full of millions of different tools for every possible job. TRM is like having a small, well-organized toolbox with just the essential tools that can be used cleverly to accomplish the same tasks. Even though TRM has far fewer 'tools' (parameters), it uses them much more efficiently by applying them over and over in a smart way. It's like how a skilled craftsperson can build beautiful furniture with just a few high-quality tools, while someone else might need an entire workshop full of specialized equipment to make the same thing.

*Source: Abstract and throughout the results sections*

### Latent Features (y and z)

Think of solving a math word problem. You need to keep track of two things: your current answer (like writing '42' on your paper) and your working memory of how you got there (like remembering 'I multiplied the number of apples by the price per apple'). In TRM, 'y' is like your current answer written on paper - it's the actual solution you can read and understand. 'z' is like your working memory - it contains all the reasoning and thinking process that helps you improve your answer, but you can't directly read it as a solution. The model needs both: the current answer so it knows where it stands, and the reasoning memory so it knows how to make the answer better.

*Source: Section 4.2 and Figure 6*

### Overfitting vs Generalization

Imagine you're studying for a test by only memorizing the exact practice problems and their answers, rather than understanding the underlying concepts. When the real test has slightly different problems, you'll fail even though you knew all the practice problems perfectly. That's overfitting - when a model learns the training examples too specifically instead of learning general problem-solving skills. Generalization is like actually understanding the concepts so you can solve new problems you've never seen before. TRM achieves better generalization by using smaller networks that can't just memorize everything, forcing them to learn the actual patterns and rules needed to solve problems.

*Source: Section 4.4 and discussion of small networks vs large networks*

### Chain-of-Thought (CoT) vs Recursive Reasoning

Chain-of-thought is like writing out your thinking process step by step in a straight line - first I do this, then I do that, then I reach my conclusion. It's like following a recipe exactly once from start to finish. Recursive reasoning is more like a scientist who forms a hypothesis, tests it, learns from the results, forms a better hypothesis, tests that, and keeps improving through multiple cycles. Instead of thinking in a straight line, recursive reasoning thinks in loops, where each loop makes the solution better. It's like editing a story - you write a draft, read it over, make improvements, read it again, make more improvements, and repeat until you have something really good.

*Source: Section 1 Introduction and comparison with LLM approaches*

---

## How Was This Research Done?

The researchers developed TRM by systematically simplifying and improving upon the existing Hierarchical Reasoning Model (HRM). They conducted extensive ablation studies to test each design choice, training models on four challenging puzzle datasets: Sudoku-Extreme (extremely difficult 9x9 Sudoku puzzles with only 1K training examples), Maze-Hard (30x30 mazes with paths longer than 110 steps), ARC-AGI-1 (800 geometric puzzle tasks), and ARC-AGI-2 (1120 geometric puzzle tasks). For each dataset, they used heavy data augmentation - up to 1000 variations per training example through techniques like color permutation, rotations, and geometric transformations. The core methodology involves training a single 2-layer neural network to recursively improve its answers through multiple supervision steps. During each step, the model takes the current question, current answer, and reasoning state, then updates the reasoning state multiple times before proposing an improved answer. This process repeats for up to 16 supervision steps, with the model learning to recognize when it has found the correct solution and can stop early. They trained all models using the AdamW optimizer with specific hyperparameters: learning rate 1e-4, batch size 768, hidden size 512, and incorporated Exponential Moving Average for stability on small datasets.

*Source: Section 4 methodology and Section 5 Results, plus hyperparameters section*

---

## Why It Matters

This research has significant implications for making AI more efficient and accessible. The paper demonstrates that small, cleverly designed models can outperform massive language models that cost millions of dollars to train and run, while using less than 0.01% of the parameters. This could democratize AI by making powerful reasoning capabilities available to researchers and organizations without massive computational budgets. The findings challenge the current trend of building ever-larger models, suggesting that architectural innovations and efficient use of computation might be more important than raw scale. For practical applications, this means we could have AI systems that solve complex reasoning problems while running on much smaller, cheaper hardware - potentially even on phones or laptops rather than requiring expensive cloud computing. The research also provides insights into how artificial reasoning might work differently from human reasoning, showing that recursive self-improvement through multiple attempts can be more effective than trying to solve problems in a single pass. This could influence how we design AI systems for education, scientific research, and problem-solving applications where computational efficiency matters. The work opens up new research directions for developing specialized reasoning models that could complement or even replace large language models for specific types of analytical tasks.

*Source: Abstract, Conclusion section, and implications throughout the paper*


