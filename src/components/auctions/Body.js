import React, { useContext, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { AuctionCard } from './AuctionCard';
import { ProgressBar } from './ProgressBar';

export const AuctionBody = () => {
  const [auction, setAuction] = useState(null);
  const { globalMsg } = useContext(AuthContext);
  const { docs } = useFirestore('auctions', 'users');





  return (
    <div className="py-5">
      <div className="container">
        {auction && <ProgressBar auction={auction} setAuction={setAuction} />}

        {globalMsg && <Alert variant="info">{globalMsg}</Alert>}




        {docs && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {docs.map((doc) => {
              return <AuctionCard item={doc} key={doc.id} />;


            })}



          </div>

        )}

      </div>
    </div>

  );
};
