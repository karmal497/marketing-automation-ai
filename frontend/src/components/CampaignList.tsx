import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Campaign } from '../types';
import { apiClient } from '../api/client';

const CampaignList: React.FC = () => {
  const { data: campaigns, isLoading, error } = useQuery<Campaign[]>({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const response = await apiClient.get('/campaigns');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading campaigns</div>;

  return (
    <div>
      <h2>Marketing Campaigns</h2>
      {campaigns?.map((campaign) => (
        <div key={campaign.id}>
          <h3>{campaign.name}</h3>
          <p>{campaign.description}</p>
          <span>Status: {campaign.status}</span>
        </div>
      ))}
    </div>
  );
};

export default CampaignList;