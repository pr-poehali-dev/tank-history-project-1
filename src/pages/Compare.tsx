import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { sovietTanks as tanks } from "@/data/soviet-tanks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Compare = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tank1Id, setTank1Id] = useState<string>(searchParams.get("tank1") || tanks[0].id);
  const [tank2Id, setTank2Id] = useState<string>(tanks[1].id);

  const tank1 = tanks.find(t => t.id === tank1Id);
  const tank2 = tanks.find(t => t.id === tank2Id);

  useEffect(() => {
    const urlTank1 = searchParams.get("tank1");
    if (urlTank1) setTank1Id(urlTank1);
  }, [searchParams]);

  const compareValue = (val1: string, val2: string, higherIsBetter: boolean = true) => {
    const num1 = parseFloat(val1.replace(/[^\d.]/g, ''));
    const num2 = parseFloat(val2.replace(/[^\d.]/g, ''));
    if (isNaN(num1) || isNaN(num2)) return { better1: false, better2: false };
    if (higherIsBetter) {
      return { better1: num1 > num2, better2: num2 > num1 };
    } else {
      return { better1: num1 < num2, better2: num2 < num1 };
    }
  };

  const specs = [
    { label: "Масса", key: "weight" as const, higherIsBetter: false },
    { label: "Экипаж", key: "crew" as const, higherIsBetter: false },
    { label: "Скорость", key: "speed" as const, higherIsBetter: true },
    { label: "Бронирование", key: "armor" as const, higherIsBetter: true },
    { label: "Вооружение", key: "gun" as const, higherIsBetter: true },
    { label: "Двигатель", key: "engine" as const, higherIsBetter: true },
    { label: "Запас хода", key: "range" as const, higherIsBetter: true },
  ];

  if (!tank1 || !tank2) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <Icon name="Shield" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">СРАВНЕНИЕ ТАНКОВ</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono mb-3 rounded">
            ТЕХНИЧЕСКИЙ АНАЛИЗ
          </div>
          <h2 className="text-4xl font-bold mb-2">Сравнение характеристик</h2>
          <p className="text-muted-foreground">Выберите два танка для детального сравнения</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="mb-4">
                <label className="text-sm font-mono text-muted-foreground mb-2 block">ТАНК 1</label>
                <Select value={tank1Id} onValueChange={setTank1Id}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tanks.map(tank => (
                      <SelectItem key={tank.id} value={tank.id}>
                        {tank.name} ({tank.country}, {tank.year})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                <img src={tank1.image} alt={tank1.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{tank1.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{tank1.fullName}</p>
              <div className="flex gap-2 text-xs font-mono">
                <span className="px-2 py-1 bg-muted rounded">{tank1.country}</span>
                <span className="px-2 py-1 bg-muted rounded">{tank1.year}</span>
                <span className="px-2 py-1 bg-muted rounded">{tank1.type}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20">
            <CardContent className="p-6">
              <div className="mb-4">
                <label className="text-sm font-mono text-muted-foreground mb-2 block">ТАНК 2</label>
                <Select value={tank2Id} onValueChange={setTank2Id}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tanks.map(tank => (
                      <SelectItem key={tank.id} value={tank.id}>
                        {tank.name} ({tank.country}, {tank.year})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                <img src={tank2.image} alt={tank2.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{tank2.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{tank2.fullName}</p>
              <div className="flex gap-2 text-xs font-mono">
                <span className="px-2 py-1 bg-muted rounded">{tank2.country}</span>
                <span className="px-2 py-1 bg-muted rounded">{tank2.year}</span>
                <span className="px-2 py-1 bg-muted rounded">{tank2.type}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6">Технические характеристики</h3>
            <div className="space-y-4">
              {specs.map(spec => {
                const comparison = compareValue(tank1.specs[spec.key], tank2.specs[spec.key], spec.higherIsBetter);
                return (
                  <div key={spec.key} className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <div className={`text-right p-3 rounded font-mono ${comparison.better1 ? 'bg-green-500/10 text-green-600 font-bold' : 'bg-muted'}`}>
                      {tank1.specs[spec.key]}
                    </div>
                    <div className="text-sm font-bold text-muted-foreground min-w-[120px] text-center">
                      {spec.label}
                    </div>
                    <div className={`text-left p-3 rounded font-mono ${comparison.better2 ? 'bg-green-500/10 text-green-600 font-bold' : 'bg-muted'}`}>
                      {tank2.specs[spec.key]}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Info" className="text-primary" size={20} />
                История {tank1.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tank1.history}</p>
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate(`/tank/${tank1.id}`)}
              >
                Подробнее
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Info" className="text-accent" size={20} />
                История {tank2.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tank2.history}</p>
              <Button 
                variant="outline" 
                className="w-full mt-4" 
                onClick={() => navigate(`/tank/${tank2.id}`)}
              >
                Подробнее
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Compare;