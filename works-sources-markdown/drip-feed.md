# Drip Feed

## Banner Image

![odyssey](../assets/works/drip-feed/banner.png)

## Project Brief

<!— Note: for array elements, a new line indicates a new element in the array —>

| Name | Drip Feed |
| --- | --- |
| Description | Drip Feed is an installation on the idea of time as a remedy. It uses data from the 2024 American Time Use Survey to measure, for each hour of the day, how many people spend time alone versus with others. These proportions are translated into LED drips once per second from a physical drip-feed into a digital display. Each second is segregated according to the measured ratio of alone time to shared time. |
| Awards | Drip Feed is created as part of the class Time, taught by Jeff Feddersen at NYU ITP, and has been display at the Horological Society of New York as part of the group show Complication. |
| Tools | Raspberry Pi
p5.js
node.js
Physical IV drip stand
LED strip and LCD screen |
| Tags | Installation
Data Visualization |
| Roles | Group Project with Sai Ram Ved Vijapurapu
Hardware Programmer & Data Scientist |
| Acknowledgements | Sai Ram Ved Vijapurapu
Jeff Feddersen
Data for this project comes from 2024 American Time Use Survey |

# Body

<!— display counter—>

<figure class="content-figure-container">

```
<iframe class="content-video" src="<https://sairamved.github.io/drip-feed/>"></iframe>

```

</figure>

![Drip Feed](../assets/works/drip-feed/docimg-1.png)

![Drip Feed](../assets/works/drip-feed/docimg-2.png)

<div class=”fig-grid”>

![Drip Feed](../assets/works/drip-feed/docimg-3.png)

![Drip Feed](../assets/works/drip-feed/docimg-4.png)

![Drip Feed](../assets/works/drip-feed/docimg-5.png)

</div>

## Design and Research

![Complications](../assets/works/drip-feed/complications.png)

<call out>Question: How can we design a time keeping device that possesses social complication?</call out>

In horology, a complication is any function on a timepiece that displays information beyond basic hours, minutes, and seconds. Examples range from practical calendars, astronomical displays that show immense craftmanship, and recent health monitor on smart watches. These complications are providing users with information either about our extrinsic environment (astronomy) or about ourselves (health).

However, time is also social. [Study]([https://ourworldindata.org/grapher/who-americans-spend-their-time-with?country=~15-29+years](https://ourworldindata.org/grapher/who-americans-spend-their-time-with?country=~15-29+years)) shows that in recent year, time spent with others is decreasing, while time spent alone is increasing across the board.  How can we design timekeeping devices that inform us about our interrelationship with each others? How to design a complication that link ourselves with the society? 

![Time Spent Data](../assets/works/drip-feed/time-spent.png)

We obtained data from the [American Time Use Survey(ATUS) 2024]([https://www.bls.gov/tus/](https://www.bls.gov/tus/)) and conducted data processing using Python. ATUS collects the data of whether a person is doing an activity with someone else during a specific time frame. We used this piece of information as well as the specific time interval to calculate, at each time frame *t*, what is the proportion of people spending it alone vs with others. As shown from the bar chart, there is always about half of the people spending time alone regardless of time. Evening time, around 7pm, is usually when people are spending time with others, probably since people tend to have dinner together.

![alone vs with others](../assets/works/drip-feed/alone-barchart.png)

For visual references, we get inspirations from minimal dot and pattern designs. We also studied hybrid screen-physical systems. Our interaction with society feels very tangible on a day-to-day basis, therefore we want our device to go beyond the digital screen display.

![reference](../assets/works/drip-feed/reference1.png)

![reference](../assets/works/drip-feed/reference2.png)

![reference](../assets/works/drip-feed/reference3.png)

## Production

The visualization is built using p5.js. Each drop represents 1 second, and a large drop represent 1 minute. Each drop also represents one person: at the current hour, the size ratio between “alone” and “with others” show the proportion of how people decide to spend this hour.

![prototype](../assets/works/drip-feed/software-prototype1.gif)

![prototype](../assets/works/drip-feed/software-prototype2.png)

The Raspberry Pi runs a node.js server, which controls the timing for the p5 sketch client and the python script controlling the led light strip. 

![diagram](../assets/works/drip-feed/diagram.png)

![prototype](../assets/works/drip-feed/software-prototype3.png)

We put it on to a physical IV drip stand. It is being shown as a part of the group show Complication, happening at Horological Society of New York (HSNY) in spring 2026.

![installation](../assets/works/drip-feed/video1.mp4)

![installation](../assets/works/drip-feed/video2.mp4)

## Future Reading

[[Invisible Epidemic](https://pudding.cool/2023/09/invisible-epidemic/)]([https://pudding.cool/2023/09/invisible-epidemic/](https://pudding.cool/2023/09/invisible-epidemic/)) by Alvin Chang for The Pudding

[[A Day in the Life (2016)](https://ustimeuse.github.io/oneday.html)]([https://ustimeuse.github.io/oneday.html](https://ustimeuse.github.io/oneday.html))by Team Triple Treat