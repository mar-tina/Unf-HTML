# [Unf] unnecessary-library
An library built in JS to understand JS internals using Shadow Dom

## To load the library 
-> Clone the repo

   ``` git clone https://github.com/mar-tina/unf-element.git ```

-> Install dependencies 

  ``` yarn install ```

-> Build the app : **Important step .. the library is being loaded from the dist folder which is only availabe after a build**
 
 ``` yarn build ```
  
 ## To run the example TODO App:
*cd example/todo-app folder*

-> Install dependencies 

  ``` yarn install ```

-> Run the app:

   ``` yarn serve ```

TODO:

- [x] Handle Initialization
   - The App is initialized in index JS and uses a base app component that is loaded in index.html 
  
- [x] Handle Events
  - Implemented onMount and unMount 
  - Setup a template that allows implementation of native listeners through a ``` registerEvents() ``` function
  
- [x] Simple Example App 
  - Setup a simple todo app that in examples folder as a test-bed for the implementation of the frameowk
  
- [x] Handling State
 
- [x] Handling rerendering
    - Setup simple data binding across an input element and a display element i.e a div
