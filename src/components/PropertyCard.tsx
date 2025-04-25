
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import type { Property } from '@/types/property';

type PropertyCardProps = Property;

const PropertyCard = ({
  building_name,
  address,
  neighborhood,
  unit_number,
  date_of_availability,
  square_feet,
  bedrooms,
  bathrooms,
  roll_in_shower,
  grab_bars,
  wheelchair_width_doors,
  kitchen_accessible,
  elevator_access,
  rent,
  income_restricted,
  contact_name,
  phone,
  email,
  special_features,
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
        <CardTitle className="text-xl font-semibold">{building_name}</CardTitle>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Unit #{unit_number}</p>
          <p className="text-sm text-gray-500">{address}</p>
          <Badge variant="outline" className="mt-1">{neighborhood}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm">
              <span className="font-medium">Available:</span> {date_of_availability}
            </p>
            
            {(bedrooms !== undefined || bathrooms !== undefined || square_feet !== undefined) && (
              <div className="flex gap-3 mt-2">
                {bedrooms !== undefined && (
                  <p className="text-sm"><span className="font-medium">Beds:</span> {bedrooms}</p>
                )}
                {bathrooms !== undefined && (
                  <p className="text-sm"><span className="font-medium">Baths:</span> {bathrooms}</p>
                )}
                {square_feet !== undefined && (
                  <p className="text-sm"><span className="font-medium">Sq Ft:</span> {square_feet}</p>
                )}
              </div>
            )}
            
            {rent !== undefined && (
              <p className="text-sm mt-1">
                <span className="font-medium">Rent:</span> ${rent}/month
                {income_restricted === 'Y' && (
                  <span className="ml-2 text-xs text-amber-600">(Income restricted)</span>
                )}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {roll_in_shower && (
              <div className="flex items-center gap-1 text-xs">
                <span>Roll-In Shower:</span> 
                {formatYesNo(roll_in_shower)}
              </div>
            )}
            {grab_bars && (
              <div className="flex items-center gap-1 text-xs">
                <span>Grab Bars:</span>
                {formatYesNo(grab_bars)}
              </div>
            )}
            {wheelchair_width_doors && (
              <div className="flex items-center gap-1 text-xs">
                <span>Wide Doors:</span>
                {formatYesNo(wheelchair_width_doors)}
              </div>
            )}
            {kitchen_accessible && (
              <div className="flex items-center gap-1 text-xs">
                <span>Kitchen Access:</span>
                {formatYesNo(kitchen_accessible)}
              </div>
            )}
            {elevator_access && (
              <div className="flex items-center gap-1 text-xs">
                <span>Elevator:</span>
                {formatYesNo(elevator_access)}
              </div>
            )}
          </div>
          
          {special_features && (
            <div className="mt-2">
              <p className="text-xs font-medium">Special Features:</p>
              <p className="text-xs text-gray-600">{special_features}</p>
            </div>
          )}
          
          <div className="pt-4 border-t">
            <p className="font-medium text-sm">Contact Information:</p>
            <p className="text-sm">{contact_name}</p>
            <p className="text-sm">{phone}</p>
            <p className="text-sm break-all">{email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
