---
title: 3 Reasons Why Python > Java
date: '2016-11-07'
era: early
original_link: >-
  https://web.archive.org/web/20190921213508/https://www.cs.utexas.edu/blog/3-reasons-why-python-java
description: >-
  A lighthearted case for Python over Java after my first full Python project at
  the Indigitous #Hack hackathon—covering dynamic typing, the interactive
  interpreter, and easy library management.
topics:
  - college
  - craft
  - leadership
image_link: >-
  https://web.archive.org/web/20191117024228im_/https://www.cs.utexas.edu/sites/default/files/styles/large/public/blog/13307/Python_Greater_than_Java.png?itok=xOhClHY_
image_alt: Python > Java image
---

![](https://web.archive.org/web/20191117024228im_/https://www.cs.utexas.edu/sites/default/files/styles/large/public/blog/13307/Python_Greater_than_Java.png?itok=xOhClHY_ "Python > Java image")

> Python vs. Java graph

This past weekend, I went to a hackathon called [Indigitous](https://web.archive.org/web/20191117024228/https://indigitous.org/hack) [#Hack](https://web.archive.org/web/20191117024228/https://indigitous.org/hack) and I got to code up a project purely in Python. (you can check it out [here](https://web.archive.org/web/20191117024228/https://github.com/theCreedo/IndigitousMusicFinder)). This was one of the first times that I actually got to develop a complete project in Python rather than writing mini-scripts, and it was amazing to engage and see what Python could do. Coming out of the hackathon, I realised how powerful and simple the language was, and I'm going to share 3 reasons why Python is > Java.

## 1\. Python's '=' sign

If you've ever coded in Java (which is usually about 95% of the CS population) you'll quickly realise how much filler text there is just to save a variable.

There are type definitions for almost every variable you create (int, double, String, List, Map, etc...), a variable can only save one type throughout its lifetime (unless you cast, which can mess up the value), and data structures like lists, maps, and trees need to be instantiated with 'new' and given type names.

Furthermore, there's **the dreaded ';'** that defines the end of a code command and causes 99% of Java bugs... ok maybe less, but it does cause bugs when forgotten or placed in the wrong code segement.

Simply put, Java has too many rules for too much text just to do a single assignment.

_**_Python on the other hand_** **is very friendly.**_

Variables can be **declared to take in any value**. All you need is the '='' sign. 

Want an integer? 

**\*BAM\*** x = 5. 

A list?

**\*BAM\*** x = \[1, 2, 3, 4, 5\].

Want a map?

**\*BAM\*** Use Google Maps

... just kidding

**\*BAM\*** x = {'foo1':'bar1', 'foo2':'bar2'}

All you have to do is create values in their appropriate format and they can be saved into a user-defined variable.

Additionally, **a variable can CONTINUE to take in any given value**. I can save an integer into 'x', and later be like "Nah, I want 'x' to hold a map", and it'll hold the map! Or a list... or any value! Python variables are very flexible in what they can store even after declared, guaranteeing your code to adapt quickly and easily to any changes you want to make. 

Furthermore, **You don't need to say new everytime you create a variable or even declare the type**. As I said before, all you need is the '=' sign and the structure's appropriate format, and you are good to go!

Most of all, **the semi-colon is non-existent**! Every variable just needs to be declared and instantiated in its own line, and your code is good to go.

### A "Simple" Java program example

_public static void main(String args\[\]) {  
    // type is int. user defined name is 'foo'  
    int foo = 5;_

    _// type is String. user defined name is 'bar'  
    String bar = "bar";_

    _// Empty array and map  
    List<Integer> list = new ArrayList<Integer>();  
    Map<String, String> map = new HashMap<String,String>();_

    _// Number array in Java  
    int\[\] numArray = \[1, 2, 3, 4, 5\];_

    _// foo = numArray; Can't save array into single instance.  
    // foo = bar; Can't save String into integer variable  
    // foo = (int) bar; Not even sure if that's legal  
}_

### A Simple Python program example

_main() {  
    # user defined name is 'foo'. Type is based on value saved  
    foo = 5_

    _# user defined name is 'bar'. Same as above  
    bar = 'bar'_

    _# Empty array and map  
    list = \[\]  
    map = {}_

    _# Number array in python  
    num\_array = \[1, 2, 3, 4, 5\]_

    _# No need to cast or worry. Variables all saved.  
    foo = bar  
    foo = num\_array  
}_

Makes programming life so much easier doesn't it?

## 2\. Python's Line by Line Friendliness 

Python is obviously way different from Java as seen above, but one of the most defining attributes that differentiates Python from Java is that **Python can run your code instantly**.

Ok, lemme rephrase that (since instantly is a subjective word).

What I mean is that unlike Java, where all your code has to be formatted and saved into a file in order to run, **Python can interpret and run code line by line**. Python's interpreter can take in code and quickly save and execute commands, allowing you to receive instant feedback on errors in your code. This is nice, because you don't have to wait till a good amount of your program is complete before testing it, and you can develop and change your code based on feedback.

## 3\. Python's Import Ability on Libraries

Sorry for Windows users (including me), but for users with Linux on or integrated to their OS (Mac, Linux, etc...), you can **easily set up and install external Python libraries/dependencies**. As long as you use your trusty friend Google and Linux commands like pip, sudo apt-get, and brew, you can easily install and import them into your code.

During the weekend, I wanted to use a Python plotting library called [matplotlib](https://web.archive.org/web/20191117024228/http://matplotlib.org/) in order to create 2D publication quality bar graphs for our final presentation in the hackathon. By looking at the library's 'Get Started Guide' to execute a few commands on terminal to install the library, I was able to start coding up graphs based on information I had. Furthermore, I was able to automatically save these graphical images as they were created in order to show progressions of graphs. In fact, the image for this blog was all thanks to matplot lib. Check out the library if you ever have time.

Granted, this automated process on command line can cause problems when different libraries rely on different dependencies, or an unfortunate corruption of files occurs, but these errors happen very minimally, and when they do... well hopefully you know how to revert your settings to previous iterations a.k.a. backups.

## Conclusion

As you can see, unlike Java, **Python reduces the complexity and amount of rules you need in order to code things up**. This allows programmers (like you and me) to create programs efficiently and with less error. Furthermore, it allows people who don't usually program to easily get into programming through online tutorials and Google.

So if you know Python, go learn it and create awesome things with it! (when time permits)

And if you already know Python, I tip my bike helmet to you. _\*tips bike helmet\*_

Thanks for reading, and I hope you guys code up something awesome in Python this week!
