
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PropertyCardProps {
  buildingName: string;
  unitNumber: string;
  availabilityDate: string;
  contactName: string;
  phone: string;
  email: string;
}

const PropertyCard = ({
  buildingName,
  unitNumber,
  availabilityDate,
  contactName,
  phone,
  email,
}: PropertyCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{buildingName}</CardTitle>
        <p className="text-sm text-gray-500">Unit #{unitNumber}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Available:</span> {availabilityDate}
          </p>
          <div className="pt-4 border-t">
            <p className="font-medium text-sm">Contact Information:</p>
            <p className="text-sm">{contactName}</p>
            <p className="text-sm">{phone}</p>
            <p className="text-sm break-all">{email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
