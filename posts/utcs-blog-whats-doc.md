---
title: What's up Doc?
date: '2016-11-15'
era: early
original_link: >-
  https://web.archive.org/web/20200812004611/https://www.cs.utexas.edu/blog/whats-doc
description: >-
  A case for code documentation born from a frustrating hackathon with an
  undocumented game engine—addressing every excuse I used to have for skipping
  it.
topics:
  - college
  - craft
image_link: >-
  https://web.archive.org/web/20200812004611im_/https://www.cs.utexas.edu/sites/default/files/styles/large/public/blog/13307/Code.png?itok=P7MvjiSR
image_alt: Quote by Martin Fowler
---

![](https://web.archive.org/web/20200812004611im_/https://www.cs.utexas.edu/sites/default/files/styles/large/public/blog/13307/Code.png?itok=P7MvjiSR "Quote by Martin Fowler")

Several months ago, I went to a hackathon in Georgia and my team worked on an Android application game called Hungry Cats. We had a great concept, cool graphics, and amazing programmers at hand, but the one thing we didn't have was code with documentation.

What is documentation? **Documentation** is any sort of comment within your codebase that gives anyone who reads it a **brief description of your methods, classes, and implementations and how to use them**. These comments should be explained as simply as possible.

**Java Documentation Example**  
    /\*\*   
     \* Makes a potato and gives it back  
     \* @return a Potato Object  
     \*/  
     public potato makePotato() {  
         return new Potato();  
     }

    /\*\*   
     \* Eat potato and print stuff out  
     \* @param p a Potato Object  
     \* @return void  
     \*/  
    public eatPotato(Potato p) {  
        System.out.println("Eat potato: " + p.toString());  
    }

For the hackathon, we worked with an open-source project called And-engine. Its code was perfect for implementing 2D physics interaction, but there was practically NO DOCUMENTATION to explain what objects to use and how interactions worked. It was really frustrating because we spent SO MUCH TIME trying to decipher the code and extract our use cases. Though we finished the hack, it was not enjoyable at all and made me realize the value of good documentation in code.

Because of my experience, I wanted to encourage and convince you all of the importance of documentation, addressing the concerns first-time documentors may have while giving a few tips on how to start to document.

**Disclaimer**: I am not saying I am an expert at documenting, nor am I saying that these are things most people say (honestly, I could be the only one who had these concerns). But what I'm trying to do is help you face any concerns evoked by the intimidating "_documentation wall_" and push you to start documenting code confidently, hopefully realizing that it isn't as bad as it seems.

Ok let's get started.

## Concern #1: "Making Documentation is boring"

Programming is where all the "fun" is. It's where all the challenges are encountered, and where most brainpower should be allocated towards. Having to read through code and explain what it does is just tedious. It all seems pretty pointless.

**Except it isn't that at all.**

I understand where that logic is coming from. But documenting code **proves your understanding of your implementations**. It allows you to think about why you created classes/methods, forces you to think about its use cases, and allows others to understand how your code communicates.

This mindset of "Documentation is boring" is hard to break out of because it's easy to be lazy. But you focus on the short-term value your code may have. If you look at your codebase with the mindset of the long-term value of documenting code, making your code easy to understand, and desiring to share it to others (maybe make it open-source), not only will your code be 10x better (fabulous!), but it will give documenting a whole new purpose and meaning. 

## Concern #2: "Getting code down is important. Code first, document later."

That's great, except that means at the end, for a short/long-term project, you need to spend several hours deciphering and making documentation for your code. Likewise, you may not even remember the functionalities of methods or classes you implemented. Therefore you may spend way more time trying to document your code later than it took to design and come up with the implementation.

In order to solve this, if you **document your code as you implement it**, you save precious time and energy both now and in the future.

## Concern #3 "I didn't document my code, so it all looks intimidating"

If you have 15 files, 14 classes, 30 methods and not a single line of documentation for your project, of course it looks intimidating.

So document code as you go! (recurring theme...) Sure, you may have to constantly make changes if your implementation is modified, which may be tedious in itself, but it's **cheaper to change your documentation as you go** rather than looking at code a month or year later and not know what you were programming for at that time. 

## Concern #4: "This code is one-time use only"

That's great! All the more for you to practice documenting!

It's good to start documenting even when you don't need to so that you can build up a habit of documenting. Never hurts to be better at something you are still learning.

Furthermore, **you never really know if your code is** **one-time** **use or not.** For hackathons, I used to think that the code I made would never be used in the future. (It's a hack... learn from it and move on). But after being contacted by a team from a music company who wanted to use my code, it struck me the value that can come out of any code you create. Why not make it more valuable with documentation? (Never settle for less)

Most of all, **companies look at your project portfolio**. Having well-documented code allows companies to understand your code, how you code, and makes you a better candidate to recruit (possibly landing you that internship next summer).

## **So TLDR:**

**1\. Documentation saves you time when you code as you go and allows for easier recall and understanding when looking back at old code.**

**2\. Documentation develops your ability as a programmer, challenging** **you to** **understand your implementation so you can explain it simply for other people who may use it.**

**3\. Documentation saves other people time, allowing them to quickly grasp your coding interface and allowing your project to become more successful as an open-sourced project or for future external use.**

That's all my thoughts on the importance of documentation! Hope this breaks down any concerns you may have had behind documenting code. Have an awesome week, and can't wait to see all the well-documented code you guys make! :)
