import React from "react"
import Button from "./components/Button"
import { Link } from "react-router-dom"

class FinalizeExportSeq extends React.Component{
  render(){
    return(
      <div className="container">
        <div className="container">
          <div className="jumbotron j-greetings">
            <h1>This is the Finalized Format</h1>
            <hr color="#7E1530" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fermentum convallis neque ut feugiat. Proin mattis porttitor neque dictum lacinia. Ut laoreet lacus et odio interdum ullamcorper. Suspendisse porttitor turpis eu eros vehicula posuere. Phasellus interdum eu nisl non imperdiet. Vivamus et erat vestibulum, maximus orci ut, bibendum leo. Sed venenatis at risus ac ultricies. Sed sem dolor, molestie non interdum ac, ultricies vitae est. Curabitur scelerisque ac nisl nec interdum. In porta dictum enim, eu gravida lorem varius in. Donec pulvinar volutpat nisi. Sed orci lacus, fringilla et bibendum ut, imperdiet at felis. Sed et ipsum convallis, dignissim tellus in, dictum lectus. Cras sit amet imperdiet lectus. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Donec elementum nisl a rutrum mattis. Nullam rutrum rutrum tortor, id aliquet eros accumsan lobortis. Vivamus convallis mauris augue, sit amet molestie arcu pellentesque sit amet. Proin quis nibh sed ex varius tincidunt. Etiam risus nulla, aliquam quis quam eu, fermentum pharetra lacus. Nam sagittis quis mi ac euismod. Aliquam congue odio sed enim congue, quis faucibus libero ultricies. Nam auctor sed mauris a maximus. Donec nec laoreet tortor. Pellentesque nec consectetur ante, quis convallis enim. Donec nec mauris at tortor bibendum aliquam non hendrerit massa. Etiam aliquet quam quam, a convallis libero pulvinar ut. Sed euismod elit ullamcorper rhoncus rutrum.

Morbi ac accumsan quam, nec accumsan leo. Nulla facilisi. Nulla porta non ante eu pharetra. In aliquet venenatis ex, id rutrum leo viverra id. Curabitur quis eros varius, venenatis nunc ac, imperdiet urna. Vivamus molestie turpis vitae orci dictum, viverra finibus tortor egestas. Fusce in dolor quis erat elementum semper eu vel libero. Cras ornare ut nunc in bibendum. Pellentesque odio orci, euismod id purus nec, blandit posuere orci. Proin ullamcorper elementum enim, ac auctor ligula lacinia non. Donec mollis volutpat turpis, vel iaculis augue vulputate quis. In risus orci, rhoncus ac maximus vel, blandit vitae neque. Vivamus aliquet ex id condimentum porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Donec sed sapien magna. Cras fringilla massa eget faucibus laoreet. Morbi aliquet sed nisl iaculis rutrum. Phasellus massa diam, sollicitudin a augue ac, viverra fermentum purus. Duis suscipit, lorem nec maximus ultricies, nibh dolor feugiat ex, et facilisis est diam vestibulum elit. Pellentesque libero lectus, porta sit amet porta convallis, fringilla sed orci. Praesent porta interdum eros, maximus tincidunt nisi condimentum eu. Suspendisse nec lorem finibus, molestie nulla in, condimentum turpis. Praesent dignissim enim nisl, ut ornare erat rutrum vel. Mauris nec magna eu tellus mattis lacinia eu luctus elit. Quisque congue, leo id pharetra aliquam, est mi gravida enim, sit amet tempor mi nulla at arcu. Ut lectus nunc, dignissim vitae rutrum quis, auctor ultricies quam. Donec nisl felis, facilisis sed nibh non, sodales bibendum urna.

Etiam et lobortis leo, in aliquet sapien. In nec felis a massa faucibus dignissim nec ultrices metus. Curabitur non finibus nulla. Quisque quam ex, feugiat nec pharetra ut, ullamcorper vitae lectus.</p>
            <hr color="#7E1530" />
            <Button text="Export as PDF" />
            <Link to="/draft-sequence-menu">
              <Button text="Back to Draft Seq. Menu" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default FinalizeExportSeq
