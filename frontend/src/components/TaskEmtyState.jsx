import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'


const emptyMessage = {
    active: "Không có nhiệm vụ nào đang làm.",
    completed: "Chưa có nhiệm vụ nào hoàn thành.",
    all: "Chưa có nhiệm vụ nào.",
};

const emptySubText = {
    all: "Thêm nhiệm vụ đầu tiên để bắt đầu!",
    active: 'Chuyển sang "Tất Cả" để xem các nhiệm vụ đã hoàn thành.',
    completed: 'Chuyển sang "Tất Cả" để xem các nhiệm vụ đang làm.',
};

const TaskEmtyState = ({ filter }) => {
    return (
        <Card className="p-8  text-center border-0 bg-gradient-card shadow-custom-md">

            <div className="space-y-3">
                <Circle className='mx-auto size-12 text-muted-foreground' />
                <div>
                    <h3 className="font-medium text-foreground">
                        {emptyMessage[filter] || emptyMessage.all}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {emptySubText[filter] || emptySubText.all}
                    </p>
                </div>
            </div>

        </Card>
    )
}

export default TaskEmtyState