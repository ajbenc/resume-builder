import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragDrop = ({ sections, onDragEnd, children }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="resume-sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {sections.map((section, index) => (
              <Draggable key={section.type} draggableId={section.type} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-4 bg-white rounded shadow"
                  >
                    {children(section, index)}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDrop;
