
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface PropertyCardProps {
  buildingName: string;
  address: string;
  neighborhood: string;
  unitNumber: string;
  availabilityDate: string;
  squareFeet?: number;
  bedrooms?: number;
  bathrooms?: number;
  rollInShower?: string;
  grabBars?: string;
  wheelchairWidthDoors?: string;
  kitchenAccessible?: string;
  elevatorAccess?: string;
  rent?: number;
  incomeRestricted?: string;
  contactName: string;
  phone: string;
  email: string;
  specialFeatures?: string;
}

const PropertyCard = ({
  buildingName,
  address,
  neighborhood,
  unitNumber,
  availabilityDate,
  squareFeet,
  bedrooms,
  bathrooms,
  rollInShower,
  grabBars,
  wheelchairWidthDoors,
  kitchenAccessible,
  elevatorAccess,
  rent,
  incomeRestricted,
  contactName,
  phone,
  email,
  specialFeatures,
}: PropertyCardProps) => {
  const formatYesNo = (value?: string) => {
    if (!value) return null;
    return value.toLowerCase() === 'y' ? 
      <Check className="h-4 w-4 text-green-500" /> : 
      <X className="h-4 w-4 text-red-500" />;
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{buildingName}</CardTitle>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Unit #{unitNumber}</p>
          <p className="text-sm text-gray-500">{address}</p>
          <Badge variant="outline" className="mt-1">{neighborhood}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm">
              <span className="font-medium">Available:</span> {availabilityDate}
            </p>
            
            {(bedrooms !== undefined || bathrooms !== undefined || squareFeet !== undefined) && (
              <div className="flex gap-3 mt-2">
                {bedrooms !== undefined && (
                  <p className="text-sm"><span className="font-medium">Beds:</span> {bedrooms}</p>
                )}
                {bathrooms !== undefined && (
                  <p className="text-sm"><span className="font-medium">Baths:</span> {bathrooms}</p>
                )}
                {squareFeet !== undefined && (
                  <p className="text-sm"><span className="font-medium">Sq Ft:</span> {squareFeet}</p>
                )}
              </div>
            )}
            
            {rent !== undefined && (
              <p className="text-sm mt-1">
                <span className="font-medium">Rent:</span> ${rent}/month
                {incomeRestricted === 'Y' && (
                  <span className="ml-2 text-xs text-amber-600">(Income restricted)</span>
                )}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {rollInShower && (
              <div className="flex items-center gap-1 text-xs">
                <span>Roll-In Shower:</span> 
                {formatYesNo(rollInShower)}
              </div>
            )}
            {grabBars && (
              <div className="flex items-center gap-1 text-xs">
                <span>Grab Bars:</span>
                {formatYesNo(grabBars)}
              </div>
            )}
            {wheelchairWidthDoors && (
              <div className="flex items-center gap-1 text-xs">
                <span>Wide Doors:</span>
                {formatYesNo(wheelchairWidthDoors)}
              </div>
            )}
            {kitchenAccessible && (
              <div className="flex items-center gap-1 text-xs">
                <span>Kitchen Access:</span>
                {formatYesNo(kitchenAccessible)}
              </div>
            )}
            {elevatorAccess && (
              <div className="flex items-center gap-1 text-xs">
                <span>Elevator:</span>
                {formatYesNo(elevatorAccess)}
              </div>
            )}
          </div>
          
          {specialFeatures && (
            <div className="mt-2">
              <p className="text-xs font-medium">Special Features:</p>
              <p className="text-xs text-gray-600">{specialFeatures}</p>
            </div>
          )}
          
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
