import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, GripHorizontal, Type, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import * as htmlToImage from 'html-to-image';

type ItemType = 'sticker' | 'washi' | 'polaroid' | 'clip' | 'text' | 'pin' | 'photo';

interface ScrapbookItem {
  id: string;
  type: ItemType;
  content?: string;
  color?: string;
  pattern?: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  scale: number;
}

const TRAY_CATEGORIES: { name: string; items: Partial<ScrapbookItem>[] }[] = [
  {
    name: 'Stickers',
    items: [
      { type: 'sticker', content: '💜' },
      { type: 'sticker', content: '🌸' },
      { type: 'sticker', content: '🎀' },
      { type: 'sticker', content: '☕' },
      { type: 'sticker', content: '⭐' },
      { type: 'sticker', content: '💖' },
      { type: 'sticker', content: '🦋' },
      { type: 'sticker', content: '✨' },
    ]
  },
  {
    name: 'Washi Tape',
    items: [
      { type: 'washi', color: 'bg-pink-200' },
      { type: 'washi', color: 'bg-purple-200' },
      { type: 'washi', color: 'bg-blue-200', pattern: 'bg-[radial-gradient(#fff_2px,transparent_2px)] bg-[size:10px_10px]' },
      { type: 'washi', color: 'bg-amber-200', pattern: 'bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(255,255,255,0.5)_5px,rgba(255,255,255,0.5)_10px)]' },
    ]
  },
  {
    name: 'Frames & Pins',
    items: [
      { type: 'polaroid' },
      { type: 'clip' },
      { type: 'pin' },
    ]
  }
];

export default function DecorationPage() {
  const [items, setItems] = useState<ScrapbookItem[]>([]);
  const [maxZ, setMaxZ] = useState(10);
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Initialize with some default items
  useEffect(() => {
    setItems([
      { id: '1', type: 'washi', color: 'bg-pink-200', x: 40, y: 30, z: 1, rotation: -12, scale: 1 },
      { id: '2', type: 'polaroid', x: 80, y: 80, z: 2, rotation: 4, scale: 1 },
      { id: '3', type: 'sticker', content: '💜', x: 220, y: 60, z: 3, rotation: 15, scale: 1 },
      { id: '4', type: 'text', content: 'Happy Birthday Salo!', x: 60, y: 320, z: 4, rotation: -2, scale: 1 },
      { id: '5', type: 'clip', x: 70, y: 70, z: 5, rotation: 0, scale: 1 }
    ]);
  }, []);

  const addItem = (template: Partial<ScrapbookItem>, x: number, y: number) => {
    const newItem: ScrapbookItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      type: template.type || 'sticker',
      content: template.content,
      color: template.color,
      pattern: template.pattern,
      x,
      y,
      z: maxZ + 1,
      rotation: Math.random() * 20 - 10, // random slight rotation
      scale: 1,
    };
    setMaxZ(prev => prev + 1);
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (id: string, updates: Partial<ScrapbookItem>) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const bringToFront = (id: string) => {
    setMaxZ(prev => prev + 1);
    updateItem(id, { z: maxZ + 1 });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    
    try {
      const template = JSON.parse(data);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const x = e.clientX - rect.left - 30;
      const y = e.clientY - rect.top - 30;
      
      addItem(template, x, y);
    } catch (err) {
      console.error("Failed to parse dropped item", err);
    }
  };

  const handleSave = async () => {
    if (!canvasRef.current) return;
    
    try {
      setIsExporting(true);
      // Give React time to re-render without UI controls
      await new Promise(resolve => setTimeout(resolve, 150));
      
      const dataUrl = await htmlToImage.toPng(canvasRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#fcfbf8', // Match paper color just in case
      });
      
      const link = document.createElement('a');
      link.download = 'salos-scrapbook.png';
      link.href = dataUrl;
      link.click();
      toast.success('Scrapbook downloaded successfully!');
    } catch (err) {
      console.error('Failed to save image', err);
      toast.error('Failed to save scrapbook. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const addText = () => {
    const canvas = canvasRef.current;
    const centerX = canvas ? canvas.clientWidth / 2 - 80 : 100;
    const centerY = canvas ? canvas.clientHeight / 2 - 30 : 100;
    addItem({ type: 'text', content: 'Write here...' }, centerX, centerY);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row gap-4 w-full min-h-[70vh] md:h-[75vh] max-h-[850px] rounded-xl overflow-hidden border border-border/60 bg-card/40 shadow-sm relative backdrop-blur-sm">
        
        {/* Left Drawer */}
        <div className="w-full md:w-72 bg-white/60 border-b md:border-b-0 md:border-r border-border/50 flex flex-col shadow-[2px_0_10px_rgba(0,0,0,0.02)] z-20">
          <div className="p-4 border-b border-border/50 bg-white/40">
            <h3 className="font-serif text-lg font-medium text-foreground/90">Decorations</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Drag to the page, or tap on mobile.</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                onClick={addText}
                className="w-full border-dashed bg-white/50 hover:bg-white text-primary/80 hover:text-primary transition-colors"
              >
                <Type className="w-4 h-4 mr-2" /> Add Text
              </Button>
              
              <div className="relative w-full">
                <input
                  type="file"
                  accept="image/*"
                  id="scrapbook-photo-upload"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const dataUrl = event.target?.result as string;
                      if (dataUrl) {
                        const canvas = canvasRef.current;
                        const centerX = canvas ? canvas.clientWidth / 2 - 80 : 100;
                        const centerY = canvas ? canvas.clientHeight / 2 - 80 : 100;
                        addItem({ type: 'photo', content: dataUrl }, centerX, centerY);
                        toast.success('Photo added! Use the +/- buttons on the photo to resize.');
                      }
                    };
                    reader.readAsDataURL(file);
                    e.target.value = ''; // Reset
                  }}
                />
                <Button
                  variant="outline"
                  className="w-full border-dashed bg-white/50 hover:bg-white text-primary/80 hover:text-primary transition-colors"
                  onClick={() => document.getElementById('scrapbook-photo-upload')?.click()}
                >
                  <Camera className="w-4 h-4 mr-2" /> Upload Photo
                </Button>
              </div>
            </div>
            
            {TRAY_CATEGORIES.map(cat => (
              <div key={cat.name} className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-1">{cat.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData('application/json', JSON.stringify(item));
                        e.dataTransfer.effectAllowed = 'copy';
                      }}
                      onClick={() => {
                        // Quick add for mobile users
                        if (window.innerWidth < 768) {
                          const canvas = canvasRef.current;
                          const centerX = canvas ? canvas.clientWidth / 2 - 20 : 100;
                          const centerY = canvas ? canvas.clientHeight / 2 - 20 : 100;
                          addItem(item, centerX + (Math.random() * 60 - 30), centerY + (Math.random() * 60 - 30));
                          toast.success('Added to canvas');
                        }
                      }}
                      className="cursor-grab active:cursor-grabbing hover:scale-110 active:scale-95 transition-all origin-center p-2 rounded-lg hover:bg-black/5 bg-white/30 border border-white/40 shadow-sm"
                    >
                      <DrawerItemPreview item={item} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Canvas */}
        <div className="flex-1 flex flex-col relative bg-background/50">
          <div className="absolute top-4 right-4 z-[60]">
            <Button 
              onClick={handleSave} 
              disabled={isExporting}
              className="shadow-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-transform hover:scale-105"
            >
              <Camera className="w-4 h-4 mr-2" />
              📷 Save My Scrapbook
            </Button>
          </div>
          
          {/* The actual canvas container */}
          <div 
            ref={canvasRef}
            className="flex-1 w-full h-full relative overflow-hidden notebook-paper touch-none"
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'copy';
            }}
            onDrop={handleDrop}
          >
            {/* Edge shadows for depth */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.03)] pointer-events-none" />
            
            {items.map(item => (
              <CanvasItem 
                key={item.id} 
                item={item} 
                updateItem={updateItem} 
                bringToFront={bringToFront} 
                removeItem={removeItem}
                isExporting={isExporting}
                canvasRef={canvasRef}
              />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------

function DrawerItemPreview({ item }: { item: Partial<ScrapbookItem> }) {
  if (item.type === 'sticker') {
    return <div className="text-3xl filter drop-shadow-sm leading-none">{item.content}</div>;
  }
  
  if (item.type === 'washi') {
    return (
      <div className={`w-12 h-4 opacity-90 shadow-sm rounded-sm ${item.color} ${item.pattern || ''}`} />
    );
  }
  
  if (item.type === 'polaroid') {
    return (
      <div className="w-10 h-12 bg-white p-1 pb-3 shadow-md rounded-sm border border-gray-100">
        <div className="w-full h-full bg-gray-50 rounded-[1px] border border-black/5" />
      </div>
    );
  }

  if (item.type === 'clip') {
    return <div className="text-2xl text-gray-500/80 rotate-45 leading-none">📎</div>;
  }

  if (item.type === 'pin') {
    return <div className="text-2xl drop-shadow-sm leading-none">📌</div>;
  }
  
  return null;
}

interface CanvasItemProps {
  item: ScrapbookItem;
  updateItem: (id: string, updates: Partial<ScrapbookItem>) => void;
  bringToFront: (id: string) => void;
  removeItem: (id: string) => void;
  isExporting: boolean;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

function CanvasItem({ item, updateItem, bringToFront, removeItem, isExporting, canvasRef }: CanvasItemProps) {
  const isText = item.type === 'text';
  const controls = useDragControls();

  return (
    <motion.div
      drag
      dragConstraints={canvasRef}
      dragControls={isText ? controls : undefined}
      dragListener={!isText} // Text items only drag via handle
      dragMomentum={false}
      onDragStart={() => bringToFront(item.id)}
      initial={{ x: item.x, y: item.y, rotate: item.rotation, scale: 0.5, opacity: 0 }}
      animate={{ scale: item.scale || 1, opacity: 1 }}
      style={{ position: 'absolute', top: 0, left: 0, zIndex: item.z }}
      className={`group ${!isText ? 'cursor-grab active:cursor-grabbing' : ''}`}
      whileHover={!isText && !isExporting ? { scale: (item.scale || 1) * 1.02 } : {}}
      whileDrag={!isText ? { scale: (item.scale || 1) * 1.05, zIndex: 999, filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.1))' } : {}}
    >
      {/* UI Controls (Hidden during export) */}
      {!isExporting && (
        <>
          <div
            className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 cursor-pointer p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-red-500 hover:bg-red-50 hover:text-red-600 transition-all z-50 md:scale-100 scale-125"
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.id);
            }}
          >
            <X size={14} strokeWidth={2.5} />
          </div>

          {isText && (
            <div
              className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-gray-500 hover:text-gray-800 transition-all z-50 md:scale-100 scale-125"
              onPointerDown={(e) => {
                controls.start(e);
                bringToFront(item.id);
              }}
            >
              <GripHorizontal size={14} />
            </div>
          )}

          {/* Scale controls */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 flex gap-1 items-center bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-full shadow-md border border-border/50 z-50 transition-all">
            <button
              type="button"
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold hover:bg-black/5 active:scale-90 select-none"
              onClick={(e) => {
                e.stopPropagation();
                updateItem(item.id, { scale: Math.max(0.2, (item.scale || 1) - 0.1) });
              }}
              title="Shrink"
            >
              -
            </button>
            <span className="text-[9px] text-muted-foreground font-mono font-bold px-0.5 select-none">
              {Math.round((item.scale || 1) * 100)}%
            </span>
            <button
              type="button"
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono font-bold hover:bg-black/5 active:scale-90 select-none"
              onClick={(e) => {
                e.stopPropagation();
                updateItem(item.id, { scale: Math.min(3.0, (item.scale || 1) + 0.1) });
              }}
              title="Enlarge"
            >
              +
            </button>
          </div>
        </>
      )}

      {/* Content Renderers */}
      <div className={isText ? 'p-2' : ''}>
        
        {item.type === 'sticker' && (
          <div className="text-5xl md:text-6xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)] select-none pointer-events-none">
            {item.content}
          </div>
        )}

        {item.type === 'pin' && (
          <div className="text-4xl md:text-5xl drop-shadow-md select-none pointer-events-none">
            📌
          </div>
        )}
        
        {item.type === 'washi' && (
          <div 
            className={`w-32 md:w-40 h-8 md:h-10 opacity-85 shadow-sm rounded-sm mix-blend-multiply ${item.color} ${item.pattern || ''} select-none pointer-events-none border border-black/5`} 
          />
        )}
        
        {item.type === 'polaroid' && (
          <div className="w-32 md:w-40 h-40 md:h-48 bg-[#fcfcfc] p-2 pb-10 md:p-3 md:pb-14 shadow-md rounded-sm border border-gray-100 flex flex-col select-none pointer-events-none relative before:absolute before:inset-0 before:shadow-[inset_0_0_10px_rgba(0,0,0,0.02)]">
             <div className="w-full flex-1 bg-gray-100/40 rounded-sm border border-black/5 shadow-inner" />
          </div>
        )}

        {item.type === 'photo' && item.content && (
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white p-1.5 pb-2.5 shadow-md border border-black/5 rounded-sm flex flex-col select-none relative before:absolute before:inset-0 before:shadow-[inset_0_0_10px_rgba(0,0,0,0.02)]">
            <div className="w-full flex-1 overflow-hidden bg-gray-50 border border-black/5 rounded-[1px]">
              <img 
                src={item.content} 
                alt="Uploaded decoration" 
                className="w-full h-full object-cover pointer-events-none select-none" 
              />
            </div>
          </div>
        )}

        {item.type === 'clip' && (
          <div className="text-4xl md:text-5xl select-none pointer-events-none text-gray-400 rotate-45 drop-shadow-[2px_2px_2px_rgba(0,0,0,0.2)]">
            📎
          </div>
        )}

        {item.type === 'text' && (
          <div
            contentEditable={!isExporting}
            suppressContentEditableWarning
            onBlur={(e) => updateItem(item.id, { content: e.currentTarget.innerText })}
            onClick={() => bringToFront(item.id)}
            className={`bg-transparent outline-none font-handwriting text-3xl md:text-4xl text-foreground whitespace-pre-wrap min-w-[80px] max-w-[300px] text-center p-1 ${isExporting ? '' : 'focus:bg-white/20 focus:backdrop-blur-sm focus:rounded-md'}`}
            style={{ 
              textShadow: '0 1px 2px rgba(255,255,255,0.4)',
              lineHeight: '1.2'
            }}
          >
            {item.content}
          </div>
        )}
      </div>
    </motion.div>
  );
}
