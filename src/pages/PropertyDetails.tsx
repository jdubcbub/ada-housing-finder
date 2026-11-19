import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchPropertyById } from '@/services/properties';
import type { Property } from '@/types/property';

const yesNo = (value: string | null) => {
  if (value === 'Y') return 'Yes';
  if (value === 'N') return 'No';
  return value || 'Not listed';
};

const text = (value: string | number | null | undefined) =>
  value === null || value === undefined || value === '' ? 'Not listed' : String(value);

const sections = (p: Property): { id: string; title: string; rows: [string, string][] }[] => [
  {
    id: 'unit',
    title: 'Unit',
    rows: [
      ['Address', text(p.address)],
      ['Unit number', text(p.unit_number)],
      ['Neighborhood', text(p.neighborhood)],
      ['Bedrooms', text(p.bedrooms)],
      ['Bathrooms', text(p.bathrooms)],
      ['Square feet', text(p.square_feet)],
      ['Rent', p.rent == null ? 'Not listed' : `$${p.rent.toLocaleString()} per month`],
      ['Available', text(p.date_of_availability)],
      ['Occupied', yesNo(p.occupied)],
      ['Income restricted', yesNo(p.income_restricted)],
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility features',
    rows: [
      ['Wheelchair-width doors', yesNo(p.wheelchair_width_doors)],
      ['Roll-in shower', yesNo(p.roll_in_shower)],
      ['Grab bars', yesNo(p.grab_bars)],
      ['Elevator access', yesNo(p.elevator_access)],
      ['Accessible kitchen', yesNo(p.kitchen_accessible)],
      ['Other features', text(p.special_features)],
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    rows: [
      ['Name', text(p.contact_name)],
      ['Email', text(p.email)],
      ['Phone', text(p.phone)],
    ],
  },
];

const PropertyDetails = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading, isError, refetch } = useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchPropertyById(id),
    enabled: Boolean(id),
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button
          type="button"
          onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'))}
          className="mb-6 text-blue-700 underline hover:text-blue-900"
        >
          Back to results
        </button>

        {isLoading && <p role="status">Loading unit details...</p>}

        {isError && (
          <div role="alert">
            <p>There was an error loading this unit.</p>
            <button type="button" onClick={() => refetch()} className="underline text-blue-700">
              Try again
            </button>
          </div>
        )}

        {!isLoading && !isError && !property && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Unit not found</h1>
            <Link to="/" className="underline text-blue-700">
              Start a new search
            </Link>
          </div>
        )}

        {property && (
          <article>
            <h1 className="text-3xl font-bold text-slate-800 mb-1">{text(property.building_name)}</h1>
            <p className="text-gray-700 mb-8">
              {text(property.address)}, Unit {text(property.unit_number)}
            </p>

            {sections(property).map((section) => (
              <section key={section.id} className="mb-8" aria-labelledby={`section-${section.id}`}>
                <h2 id={`section-${section.id}`} className="text-xl font-semibold text-slate-800 mb-3">
                  {section.title}
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 bg-white border rounded-xl p-6">
                  {section.rows.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-sm text-gray-600">{label}</dt>
                      <dd className="font-medium text-gray-900">{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </article>
        )}
      </div>
    </main>
  );
};

export default PropertyDetails;
