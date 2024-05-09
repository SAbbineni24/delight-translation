# Reproducing the Experiments

The finetuned model notebooks are all self contained. You simply need to connect to your own GPU and run them.

The delight model has a shell script that you can run.

# Using the Webapp

To run the web app, use the following instructions:

0. `git clone` this repository. 

1. `cd webapp`

2. Make sure you have npm installed. If not, install it from [Node.js official site](https://nodejs.org/en/download/).

3. `npm --install` all external dependencies. Here is a list of them:

- @emotion/react@11.11.4 
- @emotion/styled@11.11.5
- @mui/material@5.15.16
- @types/node@20.12.7
- @types/react-dom@18.2.25
- @types/react@18.2.79
- eslint-config-next@14.2.2
- eslint@8.57.0
- next@14.2.2
- postcss@8.4.38
- react-dom@18.2.0
- react-icons@5.2.1
- react@18.2.0
- tailwindcss@3.4.3
- typescript@5.4.5

4. `pip3 install requirements.txt`. View requirments.txt to see the specific versions.

5. `npm run dev`

6. `python3 api.py` or `python api.py` depending on which version you have installed. 

7. Then, navigate to https://localhost:3000
