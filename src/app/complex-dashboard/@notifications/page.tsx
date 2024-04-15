import Card from '@/app/components/card';
import Link from 'next/link';
import React from 'react';

const MainNotificationPage = () => {
    return (
        <Card>
            <div>
                <h2>MainNotificationPage  page</h2>
                <hr />
                <Link href={"/complex-dashboard/archived"} legacyBehavior>
                    <a className='underline text-blue-700'>Archieved parallel page</a>
                </Link>
            </div>
        </Card>
    );
};

export default MainNotificationPage;