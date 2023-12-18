import { Carousel } from 'antd';
import React from 'react';

export default function Banner() {
   return (
      <div className="max-w-[887px] max-h-[481px] shrink-0">
         <Carousel autoplay >
            <img
               className="w-full h-full object-cover"
               src="https://t4.ftcdn.net/jpg/03/06/69/49/360_F_306694930_S3Z8H9Qk1MN79ZUe7bEWqTFuonRZdemw.jpg"
               alt=""
            />
            <img
               className="w-full h-full object-cover"
               src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/d7dfad107187879.5fa16aecd773f.jpg"
               alt=""
            />
         </Carousel>
      </div>
   );
}
