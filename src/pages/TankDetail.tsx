import { useParams, useNavigate } from "react-router-dom";
import { tanks } from "@/data/tanks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const TankDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tank = tanks.find(t => t.id === id);

  if (!tank) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Танк не найден</h1>
          <Button onClick={() => navigate("/")}>На главную</Button>
        </div>
      </div>
    );
  }

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
              <h1 className="text-2xl font-bold tracking-tight">ТАНКОТРИЛИЯ</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-6">
              <img 
                src={tank.image} 
                alt={tank.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">СТРАНА</div>
                  <div className="font-bold">{tank.country}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">ГОД</div>
                  <div className="font-bold">{tank.year}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">ТИП</div>
                  <div className="font-bold">{tank.type}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-xs text-muted-foreground mb-1">МАССА</div>
                  <div className="font-bold">{tank.specs.weight}</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono mb-3 rounded">
              {tank.type.toUpperCase()}
            </div>
            <h1 className="text-5xl font-bold mb-4">{tank.name}</h1>
            <p className="text-xl text-muted-foreground mb-8">{tank.fullName}</p>

            <h2 className="text-2xl font-bold mb-4">Технические характеристики</h2>
            <div className="space-y-3 font-mono text-sm mb-8">
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Экипаж:</span>
                <span className="font-bold">{tank.specs.crew}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Скорость:</span>
                <span className="font-bold">{tank.specs.speed}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Бронирование:</span>
                <span className="font-bold">{tank.specs.armor}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Вооружение:</span>
                <span className="font-bold">{tank.specs.gun}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Двигатель:</span>
                <span className="font-bold">{tank.specs.engine}</span>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Запас хода:</span>
                <span className="font-bold">{tank.specs.range}</span>
              </div>
            </div>

            <Button onClick={() => navigate("/compare?tank1=" + tank.id)} className="w-full">
              <Icon name="GitCompare" size={18} className="mr-2" />
              Сравнить с другими танками
            </Button>
          </div>
        </div>

        <Separator className="my-12" />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Icon name="BookOpen" className="text-accent" size={32} />
                История создания
              </h2>
              <p className="text-lg leading-relaxed text-foreground">{tank.history}</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Icon name="Swords" className="text-accent" size={32} />
                Боевое применение
              </h2>
              <p className="text-lg leading-relaxed text-foreground">{tank.combat}</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <Icon name="Factory" className="text-accent" size={32} />
                Производство
              </h2>
              <p className="text-lg leading-relaxed text-foreground">{tank.production}</p>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/compare?tank1=" + tank.id)}>
                    <Icon name="GitCompare" size={18} className="mr-2" />
                    Сравнить
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/")}>
                    <Icon name="Grid" size={18} className="mr-2" />
                    Все модели
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/?section=history")}>
                    <Icon name="Clock" size={18} className="mr-2" />
                    История
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/?section=designers")}>
                    <Icon name="Users" size={18} className="mr-2" />
                    Конструкторы
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TankDetail;
