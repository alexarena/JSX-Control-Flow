import React, {Component,Fragment,createElement} from 'react'

const BREAK = ()=> {
  throw new Error('break')
}

const ERRORS = {
  IF_FIRST: new Error('If must be the first child of a Conditional.'),
  NO_CHILDREN: new Error('Conditionals must have at least one child.')
}

function getFirstChildWithConditionMet(children){
  
  let matchedChild = null
  
  try{
    React.Children.forEach((children),(child,i)=>{
      
      if(child.type === If || child.type === ElseIf){
        if(child.props.condition === true){
          matchedChild = child
          BREAK()
        }
      }
      else if(child.type === Else && i === React.Children.count(children)-1){
        matchedChild = child
        BREAK()
      }
    })
  }
  finally{
    return matchedChild
  }
}

function checkIfFirst(children,totalChildren){
  if(totalChildren === 1){
    if(children.type !== If){
      throw ERRORS.IF_FIRST
    }
  }
  else if(children[0].type !== If){
    throw ERRORS.IF_FIRST
  }
}

function checkMinimumChildren(totalChildren){
  if(totalChildren === 0){
    throw new Error(ERRORS.NO_CHILDREN)
  }
}

export default class extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      matchedChild: null
    }
  }
  
  processChildren(){
    const totalChildren = React.Children.count(this.props.children)
    
    checkMinimumChildren(totalChildren)
    checkIfFirst(this.props.children,totalChildren)
    
    this.setState({
      matchedChild: getFirstChildWithConditionMet(this.props.children)
    })
  }
  
  componentDidMount(){
    this.processChildren()
  }
  
  componentDidUpdate(prevProps){
    if(this.props.children !== prevProps.children){
      this.processChildren()
    }
  }

  render() {
    return this.state.matchedChild
  }
}

export const If = ({condition,children}) =>{
  if(condition === true){
    return <React.Fragment>{children}</React.Fragment>
  }
  return null
}

export const Else = ({children}) => <Fragment>{children}</Fragment>
export const ElseIf = ({children}) => <Fragment>{children}</Fragment>

export class For extends Component{
  render(){
    // console.log(this.props.children)
    // return <this.props.children />
    
    const ListElements = []
    
    const list = this.props.of
    const key = this.props.each
    const SingleListItem = this.props.children
    
    const createOrClone = typeof this.props.children === 'object' 
      ? React.cloneElement
      : React.createElement
    
    for(let i=0; i<list.length; i++){
      const childProps = {}
      childProps[key] = list[i]
      childProps.key = list[i]
      
      ListElements.push(createOrClone(SingleListItem,childProps))
    }
    return <Fragment>{ListElements}</Fragment>
  }
}