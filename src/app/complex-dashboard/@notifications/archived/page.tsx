import Card from '@/app/components/card';
import Link from 'next/link';
import React from 'react';

const ArchievedNotifications = () => {
    return (
        <Card>
            <div>
                <h2>Notofocation archieveds page</h2>
                <hr />
                <Link href={"/complex-dashboard"} legacyBehavior>
                    <a className='underline text-blue-700'>Main notification parallel page</a>
                </Link>
            </div>
        </Card>
    );
};

export default ArchievedNotifications;