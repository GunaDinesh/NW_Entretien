export interface ResponseDto<Entity, EntityDTO> {
    data: Entity;
    fromEntity: () => EntityDTO;
}

export interface RequestDto<Entity, EntityDTO> {
    data: EntityDTO;
    toEntity: () => Entity;
}
