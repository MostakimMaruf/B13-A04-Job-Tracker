Qustion 01 : What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: => Hears the difference between get getElementById, getElementsByClassName, and querySelector / querySelectorAll

        (i) getElementById()

           * Selects a single element by id
           * it Returns one element
           * it Returns null if not found
           * Fast and efficient
           * ID must be unique 

        (ii) getElementsByClassName()

           * it's Selects elements by class name         
           * It Returns an HTMLCollection
           * It Can return multiple elements           
           * updates automatically when DOM changes
          
         (iii) querySelector()

           * Selects the first element that matches a CSS selector           
           * It's Returns one element or null           
           * Supports all CSS selectors (id, class, tag, attribute, etc.)


Qustion 02 : How do you create and insert a new element into the DOM?

Answer: => To create and insert a new element 

          (i) Create the element
          (ii) Add content
          (iii) Insert into the DOM

          also we can use append(), prepend(), before(), or after() .


Qustion 03 :  What is Event Bubbling? And how does it work?

Answer: => Event Bubbling is when an event starts from the target element and then moves up to its parent elements.

        Example:
                If you click a button inside a div:    

                   * First, the button’s event runs               
                   * Then, the div’s event runs
                
                This upward movement is called event bubbling.


Qustion 04 : What is Event Delegation in JavaScript? Why is it useful?

Answer: => Event Delegation means adding an event listener to a parent element instead of adding it to multiple child elements.

           It works because of event bubbling.
           
           Why it is useful:
           
            * Better performance          
            * Less code
           
           Works for dynamically added elements


Qustion 05 :  What is the difference between preventDefault() and stopPropagation() methods?

Answer: => 
          (i) preventDefault()
               * Stops the default browser action          
               * Example: Prevent form submission or link navigation
          
          (ii) stopPropagation()
          
               * Stops the event from bubbling to parent elements          
               * Does not stop default behavior
          
           # preventDefault() stops default action.
           # stopPropagation() stops event bubbling.