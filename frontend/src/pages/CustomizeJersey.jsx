import { useState } from 'react';
import JerseyPageHero from '../components/forms/JerseyPageHero.jsx';
import PackageGrid from '../components/forms/PackageGrid.jsx';
import CustomerDetailsForm from '../components/forms/CustomerDetailsForm.jsx';
import TeamDetailsForm from '../components/forms/TeamDetailsForm.jsx';
import PlayersTable from '../components/forms/PlayersTable.jsx';
import OrderSummary from '../components/forms/OrderSummary.jsx';
import { usePlayers } from '../hooks/usePlayers.js';
import { useApp } from '../context/AppContext.jsx';
import { teamOrders } from '../services/api.js';

export default function CustomizeJersey() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const { players, addPlayer, removePlayer, duplicatePlayer, updatePlayer } = usePlayers(10);
  const { showToast } = useApp();
  const [submitting, setSubmitting] = useState(false);

  const placeOrder = async () => {
    if (selectedIdx === null) {
      showToast('Please select a package first');
      return;
    }
    if (players.length < 10) {
      showToast('Minimum 10 players required to place order');
      return;
    }
    const incomplete = players.some((p) => !p.name || !p.number);
    if (incomplete) {
      showToast('Fill in name & number for every player');
      return;
    }

    setSubmitting(true);
    try {
      // NOTE: package IDs are seeded in the same order as PACKAGES in
      // utils/data.js via `python manage.py seed_data`, so index + 1 lines
      // up with the backend's primary keys out of the box.
      await teamOrders.create({
        package: selectedIdx + 1,
        customer_name: 'Website Customer',
        team_name: 'Untitled Team',
        players: players.map((p) => ({
          name: p.name,
          number: p.number,
          jersey_size: p.jsize,
          shorts_size: p.ssize,
          role: p.role,
        })),
      });
      showToast('Order submitted — our team will reach out to confirm payment');
    } catch (err) {
      showToast('Could not submit order — is the backend running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="jerseyPage" className="active">
      <JerseyPageHero />

      <section className="section-pad" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: 32 }}>
            <div><span className="tag">Step 1</span><h2 style={{ fontSize: '1.8rem' }}>Choose a Package</h2></div>
          </div>
          <PackageGrid selectedIdx={selectedIdx} onSelect={setSelectedIdx} />
        </div>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <div className="container order-layout">
          <div>
            <CustomerDetailsForm />
            <TeamDetailsForm />
            <PlayersTable
              players={players}
              onAdd={addPlayer}
              onRemove={removePlayer}
              onDuplicate={duplicatePlayer}
              onUpdate={updatePlayer}
            />
          </div>
          <OrderSummary selectedIdx={selectedIdx} players={players} onPlaceOrder={placeOrder} submitting={submitting} />
        </div>
      </section>
    </div>
  );
}
