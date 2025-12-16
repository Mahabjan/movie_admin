import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const initialData = {
  columns: {
    now_showing: {
      id: 'now_showing',
      title: 'Now Showing',
      taskIds: ['1', '2'],
    },
    coming_soon: {
      id: 'coming_soon',
      title: 'Coming Soon',
      taskIds: ['3'],
    },
    archived: {
      id: 'archived',
      title: 'Archived',
      taskIds: [],
    },
  },
  tasks: {
    '1': { id: '1', content: 'Inception' },
    '2': { id: '2', content: 'Interstellar' },
    '3': { id: '3', content: 'Dune Part 2' },
  },
  columnOrder: ['now_showing', 'coming_soon', 'archived'],
};

export default function KanbanBoard() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };
      setData((prev) => ({
        ...prev,
        columns: { ...prev.columns, [newColumn.id]: newColumn },
      }));
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((id) => data.tasks[id]);
            return (
              <Droppable droppableId={column.id} key={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 min-h-[200px]"
                  >
                    <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-100">
                      {column.title}
                    </h3>
                    {tasks.map((task, idx) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={idx}
                      >
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className="mb-2 p-3 rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100"
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
