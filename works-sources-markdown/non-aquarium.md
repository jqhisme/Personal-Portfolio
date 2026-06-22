# Non Aquarium

## Banner Image

![non aquarium](../assets/works/drip-feed/banner.png)

## Project Brief

<!— Note: for array elements, a new line indicates a new element in the array —>

| Name | Non Aquarium |
| --- | --- |
| Description | Non Aquarium is a real-time media system that sonifies jellyfish movement from the Monterey Bay Aquarium livestream. The system quantifies the jellyfish’s motion into data, which are used to synthesize sound through note generation and modulation of audio parameters. Thought this process, the organic movement of jellyfish is turned into an endless generative composition. |
| Awards | Non Aquarium was showcased at Bring Your Own Data (BYOD) during New York Tech Week 2026 hosted by a16z. |
| Tools | Max/MSP/Jitter
OBS
JavaScript |
| Tags | Data Sonification
System Design |
| Roles | Individual Project, Composer |
| Acknowledgements | Livestream data comes from [Live Jelly Cam by Monterey Bay Aquarium]([https://www.youtube.com/watch?v=m1XcdxjVGos](https://www.youtube.com/watch?v=m1XcdxjVGos))
This project is created as a part of a class taught by 	
Briggan Krauss in Spring 2025
Special thanks to Octavio Figueroa Moya for the help in sound design |

# Body

<!— display counter—>

<figure>

![Jellyfish Sonification](../assets/works/non-aquarium/banner.mp4)

<figcaption> Please turn on the sound for the full experience

</figure>

![Max Patch](../assets/works/non-aquarium/all-max-patch.jpg)

## Design and Research

When ideating a system that represent data with sound, I consider the following questions to create the framework for making the design choices

- What data can be extracted that encapsulates the key characteristics of the target we want to sonify?
- What kind of sound is consistent with our perception of the target? What are some characteristics of the sound (harmony, timbre, amplitude, melody, among the others)?
- How does this data to sound transduction process help us perceive the target and the data?

We don’t perceive data itself. We understand images, sound, taste of food and get spontaneous responses out of it. As a result, Non aquarium aim to use data only as a bridge, augmenting our perception via the transduction process, the meantime experimenting with the effect of synesthesia, the synergic effect of experiencing cohesive sound and visual together.

I studied current data sonification projects to understand how other artists and researchers approach to these questions. Tom Hamilton’s album [London Fix]([https://open.spotify.com/album/30EMHiZbvjcppr6TZ4YARv](https://open.spotify.com/album/30EMHiZbvjcppr6TZ4YARv)) sonifies the London Stock Exchange with a clean and beautiful sine wave sound. The note’s pitch changes with the price of gold. The audience will hear large leap in pitch when the price being changed rapidly. The quickly alternating notes augments our perception of fluctuation of the stock market. [David first]([https://direct.mit.edu/lmj/article-abstract/doi/10.1162/096112104322750755/63365/The-Music-of-the-Sphere-An-Investigation-into?redirectedFrom=fulltext](https://direct.mit.edu/lmj/article-abstract/doi/10.1162/096112104322750755/63365/The-Music-of-the-Sphere-An-Investigation-into?redirectedFrom=fulltext)) pitched up schumann resonance and used it in his performance. Even if the frequency of the phenomenon was not preserved as it is inaudible, audiences can perceive their relative relations with other sound and frequencies in the composition.

## Production

The first step building this system is to track the movement of the Jellyfish. What is good about the livecam feed is that the camera position is fixed, so only the moving parts are the jellyfish. To track the movement, I used BLOB detection implemented in the cv.jit library for real-time computation with almost no latency. This process returns the x coordinate, y coordinate, and area for each blob, along with the length of the blob array.

![Jellyfish with BLOB](../assets/works/non-aquarium/jellyfish-blob.jpg)

![Jellyfish with BLOB](../assets/works/non-aquarium/max-blob.jpg)

Designing the sound and the composition is the most important part of this project -- it involves designing how to map the data we have to different characteristics of sound. The overall logistic of the sound design and generation is shown in the image below.

![Sound design diagram](../assets/works/non-aquarium/sound-design.jpg)

**Note Triggering**

To design a sound that provides a mesmerizing and serene aesthetics, I layer a waveform synth with a noise generator and added filters on top of it. A constant metro is running to send data to the sound generation module.

There are many blobs being detected even after filtering, but human ears cannot process so many notes at the same time. Thus, only the first 5 blobs are used in triggering notes. Notes are played in a arpeggiation manner to allow audiences to hear single notes, instead of becoming lost in complicated chords. The arpeggiation also creates a flow/dynamic that corroborate the jellyfish movement.

**Pitch, Scale, and Velocity**

Pitch and scale are the most important aspects to give the composition its melodic nature. The melody is very important in this context since the aesthetics are linked strongly with melodies in the sound. The melody should be dynamic to some context -- changing scale and notes from time to time, while not being perceived as a complete random or chaos.

The composition technique referenced the circle of the fifth, which I found makes the most of the sense in this context. When watching the video, audiences does not perceive the x coordinate or y coordinate of the jellyfish, but **the distance between jellyfish and the camera, or the center of the video**. This circular structure makes me think of the circle of the fifth. Additionally, as jellyfish moves in a smooth manner, swimming across different regions can be translate to switching between different scales, which is also what the circle of fifth denoting.

![Circle of fifth](../assets/works/non-aquarium/sound-1.jpg)

![Note Trigger](../assets/works/non-aquarium/sound-2.mp4)

One issue I encountered is that: jellyfish actually swim pretty fast! So they may go from C to G flat in a very short period, creating sound that are not very harmonic. With the help from Octavio Figueroa Moya, I decided to use only the upper part of the cycle. This allows less transitions, and transitioning from E flat to A actually produces a jazzy vibe.

Here, the logic of sound generation finally becomes clear. The distance d, between each blob to the center, determines the pitch. The size of the blob determines the velocity. For all the vector, pointing from the center of the video to each blob, I calculate the sum of them and determine a scale using the truncated cycle of fifth, and finally quantize all the notes on to this scale. This process includes the use of several JavaScript scripts and some math calculations.

![JavaScript Calculation](../assets/works/non-aquarium/sound-3.jpg)

**Additional Sound Effects**

To add more complexity, details, and layers to the sound, reverb, delay, and spectral delay are added. Delay has a pretty intuitive logic -- the more jellyfish there are, more layers of delay is expected. So the delay amount is modulated using the length of the blob array. The spectral delay further enhance the the characteristic of the delay by manipulating their spectral characteristics. The complete chain of effect is shown on the right.

![Sound Effect Chain](../assets/works/non-aquarium/sound-4.jpg)

Additionally, visual designs are also incorporated for the overall consistency of the experience.

![Visual Palettes](../assets/works/non-aquarium/visual-1.jpg)

![Visual Max Patch](../assets/works/non-aquarium/visual-2.jpg)