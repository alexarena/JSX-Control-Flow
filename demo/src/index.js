import React, {Component} from 'react'
import {render} from 'react-dom'

/*
This very contrived demo is primarily intented as a POC, but could easily be adapted for production.
While it implements For loops and complete If/ElseIf/Else control flow, it does so *entirely* in standard JSX.
No need for additional Babel configuration like: https://github.com/AlexGilleran/jsx-control-statements
Thus, while the syntax is similar, it is somewhat novel.
*/

import Conditional, {If,ElseIf,Else,For} from '../../src'

const names = ['Alex','Bob','Sally']

const Name = ({name}) =>(
  <li>Name: {name}</li>
)

class Demo extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      x: 0
    }
  }
  
  increment = () =>{
    this.setState((state)=>({
      x: state.x + 1
    }))
  }
  
  decrement = () =>{
    this.setState((state)=>({
      x: state.x - 1
    }))
  }
  
  render() {
    const {x} = this.state
    return(
      <div>
        
        <h2>Loops</h2>
        {/* 
          Loop syntax isn't ideal, but is still interesting.
          The For component requires one child, it can be in either of the forms below.
        */}
        <ul>
          <For each="name" of={names}>
            <Name />
          </For>
        </ul>
        
        <ul>
          <For each="name" of={names}>
            {({name})=>(
              <li>Name: {name}</li>
            )}
          </For>
        </ul>
        
        <h2>If/ElseIf/Else</h2>
        
        {/* 
          These are quite cool. You can use <If> independently as demonstrated below.
          The syntax is intuitive and aesthetically pleasing (imo).  
        */}
    
        <div>
          <If condition={x % 2 === 0}>
            <strong>even</strong>
          </If>
          <If condition={x % 2 !== 0}>
            <strong>odd</strong>
          </If>
        </div>        
        
        {/* 
          But if-statements alone aren't that interesting... 
          What *is* interesting is full If/ElseIf/Else control-flow.
          In order to use ElseIf/Else, you need to wrap your
          If/ElseIf/Else statements in a <Conditional> component.
          Conditional looks at its children and determines which case (if any) to render.
        */}
          
        <p>x is...
          <Conditional>
            <If condition={x > 0}>
              positive
            </If>
            <ElseIf condition={x < 0}>
              negative
            </ElseIf>
            <Else>
              neither positive nor negative
            </Else>
        </Conditional>
        </p>
        
        <h3>x = {x}</h3>
        <button onClick={this.increment}> x++ </button>
        <button onClick={this.decrement}> x-- </button>
    
      </div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
