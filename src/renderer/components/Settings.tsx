import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AudioDevice {
  deviceId: string;
  label: string;
}

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<AudioDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [micPermission, setMicPermission] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('selectedMic') || '';
    setSelectedDeviceId(saved);

    navigator.mediaDevices?.getUserMedia({ audio: true })
      .then((stream) => {
        stream.getTracks().forEach((t) => t.stop());
        setMicPermission(true);
        return navigator.mediaDevices.enumerateDevices();
      })
      .then((allDevices) => {
        const mics = allDevices
          .filter((d) => d.kind === 'audioinput')
          .map((d) => ({ deviceId: d.deviceId, label: d.label || `Microphone ${d.deviceId.slice(0, 8)}` }));
        setDevices(mics);
        if (saved && mics.some((m) => m.deviceId === saved)) return;
        if (mics.length > 0) {
          setSelectedDeviceId(mics[0].deviceId);
          localStorage.setItem('selectedMic', mics[0].deviceId);
        }
      })
      .catch(() => {
        setMicPermission(false);
      });
  }, []);

  const handleChange = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    localStorage.setItem('selectedMic', deviceId);
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white transition-colors mb-1 cursor-pointer">
            &larr; Back
          </button>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
      </div>

      <div className="glass-card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Audio Input</h2>

        {!micPermission && (
          <div className="flex items-center gap-2 text-sm text-yellow-400">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Microphone access denied. Grant permission and reload to see devices.</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs text-gray-400 block">Select Microphone</label>
          <select
            value={selectedDeviceId}
            onChange={(e) => handleChange(e.target.value)}
            className="bg-dark-200 border rounded px-3 py-2 text-sm text-white w-full cursor-pointer"
            style={{ borderColor: 'var(--glass-border)' }}
          >
            {devices.length === 0 && <option value="">No microphones found</option>}
            {devices.map((d) => (
              <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
            ))}
          </select>
        </div>

        {selectedDeviceId && (
          <p className="text-xs text-gray-500">
            Selected: {devices.find((d) => d.deviceId === selectedDeviceId)?.label || 'Unknown'}
          </p>
        )}
      </div>

      <div className="glass-card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wider">About</h2>
        <p className="text-sm text-gray-400">Air Learner v1.1.2</p>
        <p className="text-xs text-gray-500">Desktop guitar learning app built with Electron + React + TypeScript.</p>
      </div>
    </div>
  );
};

export default Settings;
