import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText, 
  Image as ImageIcon,
  Clock,
  User,
  ExternalLink
} from 'lucide-react';

interface Artwork {
  id: number;
  user_id: number;
  user_name: string;
  file_url: string;
  file_type: string;
  status: string;
  created_at: string;
}

export default function Artworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = () => {
    fetch('/api/admin/artworks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setArtworks(data);
        } else {
          console.error('Expected array of artworks, got:', data);
          setArtworks([]);
        }
      })
      .catch(err => console.error(err));
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/artworks/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) fetchArtworks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Artwork Management</h1>
          <p className="text-sm text-gray-500 mt-1">Review and approve customer uploaded designs</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by customer name or file type..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#f37021] outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
            <option>All Statuses</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group hover:border-[#f37021] transition-all">
            <div className="aspect-square relative bg-gray-100 flex items-center justify-center overflow-hidden">
              {(artwork.file_type || '').startsWith('image') ? (
                <img 
                  src={artwork.file_url} 
                  alt="Artwork" 
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-400">
                  <FileText className="w-16 h-16" />
                  <span className="text-xs font-bold uppercase">{(artwork.file_type || '').split('/')[1] || 'FILE'}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => setSelectedArtwork(artwork)}
                  className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <a 
                  href={artwork.file_url} 
                  download 
                  className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm border ${
                  artwork.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                  artwork.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' :
                  'bg-red-100 text-red-700 border-red-200'
                }`}>
                  {artwork.status || 'pending'}
                </span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                  {(artwork.user_name || '?').charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 truncate">{artwork.user_name || 'Unknown'}</p>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date(artwork.created_at || 0).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => updateStatus(artwork.id, 'approved')}
                  disabled={artwork.status === 'approved'}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 text-green-700 rounded-lg text-xs font-bold hover:bg-green-100 disabled:opacity-50 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> Approve
                </button>
                <button 
                  onClick={() => updateStatus(artwork.id, 'rejected')}
                  disabled={artwork.status === 'rejected'}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-bold hover:bg-red-100 disabled:opacity-50 transition-colors"
                >
                  <XCircle className="w-4 h-4" /> Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-12" onClick={() => setSelectedArtwork(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-gray-300">
            <XCircle className="w-10 h-10" />
          </button>
          <div className="max-w-4xl w-full h-full flex flex-col items-center justify-center" onClick={e => e.stopPropagation()}>
            {(selectedArtwork.file_type || '').startsWith('image') ? (
              <img src={selectedArtwork.file_url} alt="Preview" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="bg-white p-12 rounded-2xl flex flex-col items-center gap-4">
                <FileText className="w-32 h-32 text-gray-200" />
                <p className="text-xl font-bold text-gray-900">File Preview Not Available</p>
                <a href={selectedArtwork.file_url} download className="px-6 py-3 bg-[#f37021] text-white rounded-xl font-bold flex items-center gap-2">
                  <Download className="w-5 h-5" /> Download to View
                </a>
              </div>
            )}
            <div className="mt-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center gap-8 text-white">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Customer</p>
                <p className="font-bold">{selectedArtwork.user_name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">File Type</p>
                <p className="font-bold">{(selectedArtwork.file_type || '').split('/')[1]?.toUpperCase() || 'FILE'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Uploaded On</p>
                <p className="font-bold">{new Date(selectedArtwork.created_at || 0).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {artworks.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No artworks found</h3>
          <p className="text-gray-500">When users upload designs, they will appear here for review.</p>
        </div>
      )}
    </div>
  );
}
