import AddTask from '@/components/AddTask';
import DateTimeFilters from '@/components/DateTimeFilters';
import Footer from '@/components/Footer';
import StatsAndFilters from '@/components/StatsAndFilters';
import TaskList from '@/components/TaskList';
import TaskListPagination from '@/components/TaskListPagination';
import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import api from '@/lib/axios';
import { visibleTaskLimit } from '@/lib/data';

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [completeTaskCount, setCompleteTaskCount] = useState(0);
    const [filter, setFilter] = useState('all');
    const [dateQuery, setDateQuery] = useState('today');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks();
    }, [dateQuery])

    useEffect(() => {
        setPage(1);
    }, [filter, dateQuery])

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`)
            setTaskBuffer(res.data.tasks);
            setActiveTaskCount(res.data.activeCount);
            setCompleteTaskCount(res.data.completeCount);
        } catch (error) {
            console.error("Lỗi xảy ra khi truy xuất tasks", error);
            toast.error("Lỗi xảy ra khi truy xuất tasks.");
        }
    }

    const handleTaskChanged = () => {
        fetchTasks();
    }

    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active':
                return task.status === 'active';
            case 'completed':
                return task.status === 'complete';
            default:
                return true;
        }
    });

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);

    const handelNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }

    const handelPrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    }

    const handelPageChange = (newPage) => {
        setPage(newPage);
    }

    const visibleTask = filteredTasks.slice(
        (page - 1) * visibleTaskLimit,
        page * visibleTaskLimit
    );

    if (visibleTask.length === 0) {
        handelPrev();
    }

    return (
        <div className="min-h-screen w-full bg-white relative">
            {/* Dual Gradient Overlay (Bottom) Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 100%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 100% 80%, rgba(59,130,246,0.3), transparent)
      `,
                    backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
                }}
            />
            {/* Your Content/Components */}
            <div className="container pt-8 mx-auto relative z-10">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    {/* {Đầu Trang} */}
                    <Header />

                    {/* {Tạo nhiệm vụ} */}
                    <AddTask handleNewTaskAdded={handleTaskChanged} />

                    {/* {Thống kê và lọc} */}
                    <StatsAndFilters
                        filter={filter}
                        setFilter={setFilter}
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completeTaskCount}
                    />

                    {/* {Danh sách Task} */}
                    <TaskList filteredTasks={visibleTask} filter={filter} handleTaskChanged={handleTaskChanged} />

                    {/* {Phân trang và lọc theo ngày} */}
                    <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination
                            handelNext={handelNext}
                            handelPrev={handelPrev}
                            handelPageChange={handelPageChange}
                            page={page}
                            totalPages={totalPages}
                        />
                        <DateTimeFilters dateQuery={dateQuery} setDateQuery={setDateQuery} />
                    </div>

                    {/* {Chân Trang} */}
                    <Footer
                        activeTasksCount={activeTaskCount}
                        completedTasksCount={completeTaskCount}
                    />

                </div>
            </div>
        </div>

    )
}

export default HomePage