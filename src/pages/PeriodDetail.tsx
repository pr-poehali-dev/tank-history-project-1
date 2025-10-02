import { useParams, useNavigate } from "react-router-dom";
import { periods } from "@/data/periods";
import { sovietTanks } from "@/data/soviet-tanks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

const PeriodDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const period = periods.find(p => p.id === id);

  if (!period) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Период не найден</h1>
          <Button onClick={() => navigate("/?section=history")}>К истории</Button>
        </div>
      </div>
    );
  }

  const periodTanks = sovietTanks.filter(tank => period.keyTanks.includes(tank.name));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/?section=history")}>
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Назад к истории
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
        <div className="mb-12">
          <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-mono mb-3 rounded">
            {period.years}
          </div>
          <h1 className="text-5xl font-bold mb-4">{period.title}</h1>
          <p className="text-xl text-muted-foreground">{period.shortDesc}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="BookOpen" className="text-accent" size={28} />
                  Обзор периода
                </h2>
                <p className="text-lg leading-relaxed">{period.content.overview}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Wrench" className="text-accent" size={28} />
                  Разработка и конструкция
                </h2>
                <p className="text-lg leading-relaxed">{period.content.development}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Factory" className="text-accent" size={28} />
                  Производство
                </h2>
                <p className="text-lg leading-relaxed">{period.content.production}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Swords" className="text-accent" size={28} />
                  Боевое применение
                </h2>
                <p className="text-lg leading-relaxed">{period.content.combat}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="Award" className="text-accent" size={28} />
                  Наследие и значение
                </h2>
                <p className="text-lg leading-relaxed">{period.content.legacy}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24 mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Ключевые события</h3>
                <div className="space-y-4">
                  {period.keyEvents.map((event, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 w-16 h-16 bg-accent/10 rounded flex items-center justify-center">
                        <span className="text-accent font-bold font-mono text-sm">{event.year}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{event.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/?section=models")}>
                    <Icon name="Grid" size={18} className="mr-2" />
                    Все танки периода
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate("/?section=history")}>
                    <Icon name="Clock" size={18} className="mr-2" />
                    Другие периоды
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

        {periodTanks.length > 0 && (
          <>
            <Separator className="my-12" />
            <div>
              <h2 className="text-3xl font-bold mb-8">Ключевые танки периода</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {periodTanks.map(tank => (
                  <Card 
                    key={tank.id}
                    className="overflow-hidden group hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => navigate(`/tank/${tank.id}`)}
                  >
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img 
                        src={tank.image} 
                        alt={tank.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold mb-1">{tank.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{tank.type}</p>
                      <div className="flex gap-1 text-xs font-mono">
                        <span className="px-2 py-1 bg-muted rounded">{tank.year}</span>
                        <span className="px-2 py-1 bg-muted rounded">{tank.specs.weight}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PeriodDetail;